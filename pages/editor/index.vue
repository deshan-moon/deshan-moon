<template> 
  <div> 
    <h1>editor Page</h1> 
  </div> 
</template> 
<script>
export default { 
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: "editor" 
};
</script> 
<style>
</style>