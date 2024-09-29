<template>
  <div class="max_box">
    <a class="abtn aleft"></a>
    <a class="abtn aright"></a>
    <ul>
      <li title="汽车散热器防冻液/防冻剂1500毫升" 
      v-for="(item,index) in BMWdata" :key="index">
        <div class="pic_box">
          <img :src="item.img" />
        </div>
        <div class="txt_box">
          <p>BMW 官网商城</p>
          <p>{{item.subtitle}}</p>
          <p>
            <span class="smallred">
              ￥
              <span class="redcount">{{item.price}}</span>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import Swiper from "../assets/js/swiper.js";
import Bmwinfo from '../assets/js/bwmData.js'
export default {
      data() {
        return {
          BMWdata:Bmwinfo
        }
      },
};
</script>
<style lang="less" scoped>
.max_box {
  width: 1200px;
  overflow: hidden;
  position: relative;
  height: 302px;
  margin: 20px 0 100px 0;
  a.abtn {
    color: #1c69d4;
    text-decoration: none;
    cursor: pointer;
    top: 88px;
    display: block;
    width: 17px;
    height: 61px;
    position: absolute;
    overflow: hidden;
    text-indent: -20000px;
    background-image: url('../assets/imgs/arr_btn.png');
    background-repeat: no-repeat;
  }
  .aleft {
    background-position: left top;
    left: -30px;
  }
  .aright {
    background-position: right top;
    right: -30px;
  }
  > ul {
    width: 20000px;
    position: absolute;
    left: 0px;
    top: 0px;
    li {
      width: 227px;
      float: left;
      margin-right: 16px;
      height: 302px;
      .pic_box {
        width: 225px;
        height: 225px;
        border: 1px #eaeaea solid;
        img {
          width: 100%;
        }
      }
      .txt_box {
        padding-top: 14px;
        p {
          height: 22px;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #e60012;
          }
        }
      }
    }
  }
}
</style>>

