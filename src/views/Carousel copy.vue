<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in bannerimg" :key="index">
          <img :src="item.imgurl" alt="">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from '../assets/js/swiper';
import '../assets/css/bulletCSS.css'
import'../assets/css/swiper.min.css';
export default {
  data() {
    return {
      bannerimg:[],//轮播图数组
    }
  },
  created() {
    this.$axios.get('http://rap2api.taobao.org/app/mock/240645/get/banner').then((res)=>{
      //console.log(res)
       if(res.data.code==1){
       this.bannerimg=res.data.data;
      }
    //console.log(this.bannerimg)
    })
    
  },
  updated() {//初始化轮播
    new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay:true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        bulletClass : 'my-bullet',
        bulletActiveClass: 'my-bullet-active',
      }
    })
  }
}
</script>

<style>

.swiper-container {
    width:100%;
} 
.swiper-container .swiper-wrapper{
  width:100%;
  height:100vh;
}
.swiper-container .swiper-wrapper .swiper-slide{
    width:100%;
   height:100%;
}
.swiper-container .swiper-wrapper .swiper-slide img{
  width:100%;
  height:100%;
}
.swiper-pagination-bullet-active{
  opacity: 1;
  background: #007aff;
}
.my-bullet{
    width: 35px;
    height: 5px;
    display: inline-block;
    border-radius: 100px;
    background: #8F8F8F;
    opacity: 1;
}
</style>