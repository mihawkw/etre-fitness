-- Supabase 数据库初始化脚本
-- 在 Supabase SQL 编辑器中执行此脚本

-- 1. 创建用户表（存储用户配置）
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- 用户ID（设备唯一标识）
  custom_actions JSONB DEFAULT '{}', -- 自定义打卡项
  custom_training JSONB DEFAULT '{}', -- 自定义训练计划
  start_date DATE, -- 起始日期
  current_phase INTEGER DEFAULT 1, -- 当前阶段
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建打卡记录表
CREATE TABLE IF NOT EXISTS checks (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL, -- meal, training, evening, special
  action_id TEXT NOT NULL,
  time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date, category, action_id)
);

-- 3. 创建日志表
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  action_id TEXT NOT NULL,
  date DATE NOT NULL,
  content TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, action_id, date)
);

-- 4. 创建体重记录表
CREATE TABLE IF NOT EXISTS weights (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL(5,1) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 5. 创建记录表（打卡历史）
CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  action_id TEXT NOT NULL,
  action_name TEXT,
  category TEXT,
  time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 启用RLS（行级安全策略）
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- 7. 创建策略（用户只能访问自己的数据）
CREATE POLICY "用户只能访问自己的数据" ON users
  FOR ALL USING (true);

CREATE POLICY "用户只能访问自己的打卡" ON checks
  FOR ALL USING (true);

CREATE POLICY "用户只能访问自己的日志" ON logs
  FOR ALL USING (true);

CREATE POLICY "用户只能访问自己的体重" ON weights
  FOR ALL USING (true);

CREATE POLICY "用户只能访问自己的记录" ON records
  FOR ALL USING (true);

-- 8. 创建索引以提高查询性能
CREATE INDEX idx_checks_user_date ON checks(user_id, date);
CREATE INDEX idx_logs_user_action ON logs(user_id, action_id);
CREATE INDEX idx_weights_user_date ON weights(user_id, date);
CREATE INDEX idx_records_user_time ON records(user_id, time);
