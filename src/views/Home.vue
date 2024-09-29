<template>
  <div>
    <Carousel />
    <ul class="cf">
      <li v-for="(item,index) in list1" :key="index" @click="goTo(index,item.url)">
          <div class="title_txt">
            <span>BMW</span>
            {{item.title}}
          </div>
          <div class="enter">
            Enter
            <i class="el-icon-caret-right"></i>
          </div>
          <img :src="item.img" />
      </li>
    </ul>
    <div class="enent_box">
      <div class="enent_tit">
        <h2>
          活动中心
          <span>Activity center</span>
        </h2>
      </div>
      <div class="enent_main">
        <div class="r_box">
          <img src="../assets/imgs/activecenter0.jpg" style="opacity: 1;" />
          <span class="hotSlow">
            <img src="../assets/imgs/hot.png" style="opacity: 1;" />
          </span>
        </div>
        <div class="r_box r_box_center">
          <img src="../assets/imgs/activecenter1.jpg" style="opacity: 1;" />
          <span class="hotSlow">
            <img src="../assets/imgs/hot.png" style="opacity: 1;" />
          </span>
        </div>
        <div class="r_box">
          <img src="../assets/imgs/activecenter2.jpg" style="opacity: 1;" />
          <span class="hotSlow">
            <img src="../assets/imgs/hot.png" style="opacity: 1;" />
          </span>
        </div>
      </div>
    </div>
    <HotList />
  </div>
</template>

<script>
import HotList from "@/components/HotList.vue";
import Carousel from "@/views/Carousel.vue";
export default {
  components: {
    HotList,
    Carousel
  },
  data() {
    return {
      list1: [
        {
          title: "生活精品",
          img: require("../assets/imgs/list0.jpg"),
          url: "/goodlife"
        },
        {
          title: "原厂附件",
          img: require("../assets/imgs/list1.jpg"),
          url: "/orginalfit"
        },
        {
          title: "汽车养护",
          img: require("../assets/imgs/list2.jpg"),
          url: "/carcare"
        },
        {
          title: "新车在线销售",
          img: require("../assets/imgs/list3.jpg"),
          url: "https://www.bmw.com.cn/zh/index.html"
        },
        {
          title: "官方认证二手车",
          img: require("../assets/imgs/list4.jpg"),
          url: "https://bmwusedcar.bmw.com.cn/portal/bmwuc/index.html?t=1577365460388"
        }
      ]
    };
  },
  created() {
    this.$store.state.wherego = 0;
  },
  methods: {
    goTo(index,url){
      if(index<=2){
        this.$router.push({
          path:url
        })
      }else{
        location=url;
      }
    }
  },
};
</script>

<style scoped>
.enter {
  color: cornflowerblue;
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 24px;
}
.cf {
  min-width: 1200px;
  padding: 0 100px;
  padding-top: 50px;
  position: relative;
}
.cf li {
  display: block;
  position: relative;
  width: 20%;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
}
.cf li:hover img {
  transform: scale(1.1);
}
.title_txt {
  left: 24px;
  top: 26px;
  position: absolute;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  color: #222;
  font-size: 18px;
  font-weight: bold;
  z-index: 2;
}
.cf img {
  transition: all 0.6s;
  width: 100%;
  vertical-align: top;
}
.enent_box {
  padding: 50px 100px 0 100px;
}
.enent_tit {
  height: 30px;
  line-height: 30px;
}
.enent_tit h2 {
  float: left;
  font-size: 24px;
  color: #222;
}

.enent_tit h2 span {
  font-size: 14px;
  font-weight: normal;
  color: #1b68d2;
  padding-left: 14px;
  text-transform: uppercase;
}
.enent_main {
  margin-top: 30px;
  overflow: hidden;
  min-width: 1200px;
}
.enent_main .r_box {
  float: left;
  width: 32.3%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.enent_main .r_box_center {
  margin: 0 1.5%;
}
.enent_main .r_box img {
  width: 100%;
}
.hotSlow {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 0;
}
</style>