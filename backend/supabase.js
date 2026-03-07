// Supabase 配置
// 请在 Supabase (https://supabase.com) 创建免费项目并填写以下信息

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // 例如: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // 例如: eyJhbGciOiJIUzI1NiIs...

// 如果未配置Supabase，使用本地存储
const USE_SUPABASE = false; // 设置为true启用Supabase

class DataService {
  constructor() {
    this.supabase = null;
    this.initialized = false;
  }

  async init() {
    if (!USE_SUPABASE) {
      console.log('使用本地存储模式');
      return false;
    }

    if (USE_SUPABASE && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
      try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        this.initialized = true;
        console.log('Supabase 已连接');
        return true;
      } catch (e) {
        console.error('Supabase 初始化失败:', e);
        return false;
      }
    }
    return false;
  }

  // 用户相关
  async getUserData(userId) {
    if (!this.initialized) return null;
    
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  async saveUserData(userId, data) {
    if (!this.initialized) return null;
    
    const { error } = await this.supabase
      .from('users')
      .upsert({ id: userId, ...data, updated_at: new Date().toISOString() });
    
    if (error) throw error;
    return true;
  }

  // 打卡记录
  async getChecks(userId, date) {
    if (!this.initialized) return null;
    
    const { data, error } = await this.supabase
      .from('checks')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date);
    
    if (error) throw error;
    return data;
  }

  async saveCheck(userId, date, category, actionId, time) {
    if (!this.initialized) return null;
    
    const { error } = await this.supabase
      .from('checks')
      .upsert({ 
        user_id: userId, 
        date, 
        category, 
        action_id: actionId, 
        time,
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return true;
  }

  async deleteCheck(userId, date, category, actionId) {
    if (!this.initialized) return null;
    
    const { error } = await this.supabase
      .from('checks')
      .delete()
      .eq('user_id', userId)
      .eq('date', date)
      .eq('category', category)
      .eq('action_id', actionId);
    
    if (error) throw error;
    return true;
  }

  // 日志
  async getLogs(userId, actionId) {
    if (!this.initialized) return null;
    
    const { data, error } = await this.supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .eq('action_id', actionId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async saveLog(userId, actionId, date, content) {
    if (!this.initialized) return null;
    
    const { error } = await this.supabase
      .from('logs')
      .upsert({ 
        user_id: userId, 
        action_id: actionId, 
        date, 
        content,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return true;
  }

  // 体重记录
  async getWeights(userId) {
    if (!this.initialized) return null;
    
    const { data, error } = await this.supabase
      .from('weights')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async saveWeight(userId, date, weight) {
    if (!this.initialized) return null;
    
    const { error } = await this.supabase
      .from('weights')
      .upsert({ user_id: userId, date, weight });
    
    if (error) throw error;
    return true;
  }

  // 同步所有数据
  async syncAllData(userId, localData) {
    if (!this.initialized) return null;
    
    // 上传本地数据到云端
    if (localData.customActions) {
      await this.saveUserData(userId, { custom_actions: localData.customActions });
    }
    if (localData.customTraining) {
      await this.saveUserData(userId, { custom_training: localData.customTraining });
    }
    if (localData.startDate) {
      await this.saveUserData(userId, { start_date: localData.startDate });
    }
    if (localData.currentPhase) {
      await this.saveUserData(userId, { current_phase: localData.currentPhase });
    }
    
    return true;
  }

  // 从云端下载数据
  async downloadAllData(userId) {
    if (!this.initialized) return null;
    
    const userData = await this.getUserData(userId);
    return userData;
  }
}

const dataService = new DataService();
