<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html,body {
  width: 100%;
  height: 100% !important;
  background: white !important;
}
.animated{
  animation-duration: 0.3s !important;
  animation-delay: 0;
}
#app{
  width: 100%;
  /* height: 100% !important; */
}
</style>
