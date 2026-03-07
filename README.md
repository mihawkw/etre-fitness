# eTRE健体管理系统 v0.5 (PWA + 云端版)

## 功能特性

- ✅ 每日打卡（进食、训练、晚间、特种）
- ✅ 训练计划管理
- ✅ 日志记录
- ✅ 进度追踪
- ✅ PWA支持（可添加到主屏幕）
- ✅ 云端数据同步（可选）
- ✅ 支持App Store提交

## 快速开始

### 1. 本地使用（无需服务器）

直接在浏览器中打开 `index.html` 即可使用。

### 2. 云端数据同步（可选）

#### 2.1 创建Supabase项目

1. 访问 [supabase.com](https://supabase.com) 创建免费项目
2. 在 SQL 编辑器中执行 `backend/supabase-init.sql`
3. 获取项目的 URL 和 anon key

#### 2.2 配置Supabase连接

编辑 `backend/supabase.js`：

```javascript
const SUPABASE_URL = 'your-supabase-url'; // 例如: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'your-anon-key';
const USE_SUPABASE = true;
```

#### 2.3 部署后端

```bash
# 使用任意静态托管服务
# 例如 Vercel, Netlify, 或自己的服务器
npx serve
```

### 3. PWA安装

#### iOS（Safari）
1. 在Safari中打开网站
2. 点击分享按钮
3. 选择「添加到主屏幕」

#### Android（Chrome）
1. 在Chrome中打开网站
2. 会出现「安装应用」提示
3. 点击安装

### 4. App Store 提交（可选）

#### 方案一：PWA平台
- 使用 [PWABuilder](https://www.pwabuilder.com/) 将PWA转换为App Store包
- 或使用 [Capacitor](https://capacitorjs.com/) 包装为原生App

#### 方案二：Xcode原生（需Mac）

1. 在Mac上用Xcode打开 `ios/` 项目
2. 配置签名证书
3. 提交到App Store

## 项目结构

```
bodybuild/
├── index.html              # 主应用
├── manifest.json           # PWA配置
├── service-worker.js       # PWA离线支持
├── backend/
│   ├── supabase.js        # Supabase客户端
│   └── supabase-init.sql  # 数据库初始化
├── ios/
│   ├── AppInfo.plist      # iOS配置
│   └── Sources/           # Swift源码
└── README.md
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **数据库**: Supabase (PostgreSQL)
- **PWA**: Service Worker, Web App Manifest
- **原生App**: Swift + WKWebView

## 许可证

MIT
