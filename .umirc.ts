import { defineConfig } from 'umi';
const serverUrl = 'http://localhost:7001';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
    },
    { path: '/', component: '@/pages/index' },
    { path: '/demo', component: '@/pages/demo' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: serverUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
});
