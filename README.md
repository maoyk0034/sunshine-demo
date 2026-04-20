# 上岸晒太阳

基于设计稿实现的前后端分离项目：

- 前端：`Vue 3 + TypeScript + Vite`
- 后端：`Java 17 HttpServer`

## 目录结构

- `frontend/`：7 个页面路由与共享布局组件
- `backend/`：静态 JSON API，提供 `/api/site`

## 启动后端

```bat
cd backend
run.bat
```

默认监听 `http://localhost:8080`。

## 启动前端

```bat
cd frontend
npm.cmd install
npm.cmd run dev
```

默认监听 `http://localhost:5173`。

如需修改 API 地址，可在前端运行时注入：

```bat
set VITE_API_BASE=http://localhost:8080
```

目前只搭建了基础骨架，还有许多功能需要完善

欢迎各位大佬的优化以及指正！！！

