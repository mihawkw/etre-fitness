# eTRE健体管理系统 v0.5

## 功能特性

- ✅ 每日打卡（进食、训练、晚间、特种）
- ✅ 训练计划管理
- ✅ 日志记录
- ✅ 进度追踪
- ✅ PWA支持（可添加到主屏幕）
- ✅ 支持App Store提交

## 快速开始

### 1. 部署

**方法一：GitHub Pages（推荐）**

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Source 选择 main 分支
4. 获得 `https://你的用户名.github.io/etre-fitness/` 链接

**方法二：Netlify Drop**

1. 打开 https://app.netlify.com/drop
2. 拖入整个文件夹
3. 自动获得 HTTPS 链接

### 2. 安装到手机

**iOS（Safari）**
1. 用 Safari 打开部署的链接
2. 点击分享按钮
3. 选择「添加到主屏幕」

**Android（Chrome）**
1. 用 Chrome 打开链接
2. 点击「安装应用」

## 项目结构

```
bodybuild/
├── index.html              # 主应用
├── manifest.json           # PWA配置
├── service-worker.js       # PWA离线支持
├── backend/               # 云端版（可选）
│   ├── supabase.js
│   └── supabase-init.sql
├── ios/                   # iOS原生版（可选）
│   ├── AppInfo.plist
│   └── Sources/
└── README.md
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest

## 许可证

MIT
