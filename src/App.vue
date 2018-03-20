<template>
  <div id="app">
    <transition name="move" mode="out-in"><router-view></router-view></transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  /*@import "../static/css/iconfont.css";*/
  @import "../static/css/main.css";
 /* @import "../static/css/color-dark.css"; */    /*深色主题*/
  @import "../static/css/theme-green/color-green.css";   /*浅绿色主题*/
  .move-enter {
    opacity:0;
  }
  .move-leave{
    opacity:1;
  }
  .move-enter-active{
    transition:opacity .5s;
  }
  .move-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
</style>
