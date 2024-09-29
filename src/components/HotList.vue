<template>
  <div class="max">
    <div class="hot_box">
      <div class="hot_tit">
        <h2>
          热销专区
          <span class>hot</span>
        </h2>
      </div>
    
      <div class="hot_main cf">
        <div class="hor_e">
          <div class="hot_r">
            <ul>
              <li v-for="(item,index) in hotlist" :key="index" @click="handleDetail(index)">
                <div class="pic_box" >
                <img :src="item.img" alt="">
                </div>
                <div class="name_box">
                  <h1>宝马官方商城</h1>
                  <p>{{item.subtitle}}</p>
                </div>
                <div class="money_box">
                  ￥
                  <span>{{item.price}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Detail from '../components/Detail'
export default {
  data() {
    return {};
  },
  // components:{Detail},
  created() {
    //  this.hotlist=bwmData
    //  console.log(this.hotlist)
  },
  computed: {
    hotlist() {
      return this.$store.state.bwmData;
    }
  },
  methods: {
    handleDetail(i) {
      this.$router.push({
        name: "detail",
        params: {
          idx: i
        }
      });
    }
  }
};
</script>
<style scoped>
.max {
  min-width: 1200px;
  margin: 0 100px;
}
.hot_box {
  padding: 60px 0 0 0;
}
.hot_tit {
  height: 30px;
  line-height: 30px;
}
.hot_tit h2 {
  float: left;
  font-size: 24px;
  color: #222;
}
.hot_tit h2 span {
  font-size: 14px;
  font-weight: bold;
  color: #e60012;
  padding-left: 14px;
  text-transform: uppercase;
}
.hot_tit h2 span img {
  position: relative;
  top: 8px;
}
.hot_main {
  margin-top: 24px;
  position: relative;
}

.hot_main .aleft {
  background-position: left top;
  left: -69px;
}
.hot_main .aright {
  background-position: right top;
  right: -69px;
}
.hot_l {
  float: left;
  width: 238px;
  overflow: hidden;
  height: 746px;
}
.hot_l a img {
  transition: all 0.6s;
}
.hot_l a:hover img {
  transform: scale(1.05);
}
.hor_e {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.hot_r {
  width: 100%;
  position: relative;
  margin-left: 1px;
  overflow: hidden;
}
.hot_r ul {
  width: 100%;
  overflow: hidden;
}
.hot_r ul li {
  float: left;
  width: 18.83%;
  margin-right: 1.25%;
  margin-bottom: 15px;
  border: 1px #eeeeef solid;
}
.hot_r ul li:nth-child(5n) {
  margin-right: 0;
}
.hot_r ul li .pic_box {
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  padding: 10px;
}
.hot_r ul li .pic_box img {
  transition: all 0.6s;
  width: 100%;
  max-width: 100%;
}
.hot_r ul li .pic_box:hover img {
  transform: scale(1.05);
}
/* .hot_r ul li .line_box {
  height: 15px;
  background: url() no-repeat center bottom;
} */
.hot_r ul li .name_box {
  line-height: 22px;
  padding-top: 0px;
  font-size: 14px;
  text-align: center;
  color: #3b3b3b;
  padding-left: 10px;
  padding-right: 10px;
}
.hot_r ul li .name_box h1 {
  font-size: 14px;
  text-align: left;
  font-weight: normal;
}
.hot_r ul li .name_box p {
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.hot_r ul li .money_box {
  height: 20px;
  line-height: 20px;
  padding-top: 2px;
  overflow: hidden;
  text-align: left;
  color: #e60012;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.hot_r ul li .money_box span {
  font-size: 16px;
  font-weight: bold;
}
.hot_r ul li .btn_box {
  height: 20px;
  line-height: 20px;
  padding: 8px 0 29px 0;
  overflow: hidden;
  font-size: 14px;
  text-align: center;
}
/* img{
  width: 205.88px;
  height: 205.88px;
  transition: all 1s
} */
</style>