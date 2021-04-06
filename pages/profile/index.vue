<template> 
  <div> 
    <h1>Profile Page</h1> 
  </div> 
</template> 
<script>
export default { 
  middleware: 'authenticated',
  name: "profile" 
};
</script> 
<style>
</style>