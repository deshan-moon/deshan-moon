export default {
  router: {
    // 设置路由点击样式
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0);
      routes.push(...[{
        path: '/',
        component: resolve(__dirname, 'pages/layout/'),
        children: [
          {
            path: '', // 默认子路由
            name: 'home',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: '/login', 
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/register', 
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/editor', 
            name: 'editor',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/settings', 
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/profile/:username', 
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/article/:slug', 
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          },
        ]
      }])
    }
  },
  // 注册插件
  plugins:[
    '~/plugins/request.js',
    '~/plugins/day.js',
  ]
}