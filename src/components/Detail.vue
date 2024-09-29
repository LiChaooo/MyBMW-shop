<template>
  <div class="main_box">
    <div class="top">
      <div class="left">
        <img :src="detailData.img" alt />
      </div>
      <div class="right">
        <div class="title_box">{{detailData.subtitle}}</div>
        <div class="price_box">
          ￥
          <span>{{detailData.price}}</span>
        </div>
        <div class="mon_box">
          <div class="l_box">
            销量
            <span>{{detailData.saleNumber}}</span>
          </div>
          <div class="r_box">
            累计评价
            <span>0</span>
          </div>
        </div>
        <div class="sku_box">
          <p>
            预计发货时间
            <span class="colorSize" v-if="!ischecked">请选择颜色</span>
            <span class="data" v-else>付款后48小时以内</span>
          </p>
        </div>
        <div class="color_box">
          <label>颜色</label>
          <ul>
            <li>
              <span :class="ischecked?'unblur':''" @click="ischecked=!ischecked">
                <img :src="detailData.img" alt />
              </span>
            </li>
          </ul>
        </div>
        <div class="numbox">
          <div class="l_txt">数量</div>
          <div class="num_inp">
            <div class="spinner">
              <button @click="changeNum(2)">-</button>
              <input type="text" v-model="purchasenum" />
              <button @click="changeNum(1)">+</button>
            </div>
          </div>
          <div class="r_txt">件</div>
        </div>
        <div class="buy_btn">
          <ul>
            <li @click="addGoods">
              <a href="javascript:;" :class="ischecked?'active':''">加入购物车</a>
            </li>
            <li @click="gobuy">
              <a href="javascript:;" :class="ischecked?'active':''">立即购买</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="interested">
      <div class="title">推荐商品</div>
      <Banner />
    </div>
    <el-dialog title="信息" width="20%" :visible.sync="isshow">
      <span v-text="text"></span>

      <span slot="footer" class="dialog-footer">
        <el-button class="btn_sub" type="primary" @click="isshow=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bwmData from "../assets/js/bwmData";
import Banner from '../components/banner.vue'
export default {
  data() {
    return {
      idx: "",
      detailData: {}, //对应商品的信息
      ischecked: false, //控制商品颜色是否被选
      isshow: false, //对话框的显示与否
      purchasenum: 1, //表示用户选择商品的数量
      text: "",//控制对话框中的内容
    };
  },
  methods: {
    
    changeNum(i) {
      if (i == 1) {
        this.purchasenum++;
      } else if (i == 2) {
        if (this.purchasenum <= 0) {
          return false;
        } else {
          this.purchasenum--;
        }
      }
    },
    addGoods() {
      this.isshow = true;
      let newObj={single:this.detailData,num:this.purchasenum}
      if (this.ischecked == false) {
        this.text = "请先选择颜色";
      } else if (this.ischecked == true) {
        this.text = "加入购物车成功";
        this.$store.commit('addSingleMut',newObj)
      }
      
      
      // console.log(newObj)
    },
    gobuy(){
       this.isshow = true;
      if (this.ischecked == false) {
        this.text = "请先选择颜色";
      } else if (this.ischecked == true) {
        let newObj={single:this.detailData,num:this.purchasenum}
        this.$store.commit('buysingleMut',newObj)
        this.$router.push('/checkout')
        
      }
    }
  },
  components:{Banner},
  created() {
    this.idx = this.$route.params.idx;
    this.detailData = bwmData[this.idx];
    console.log(this.detailData);
  }
};
</script>
<style lang="less" scoped>
.btn_sub {
  width: 80px;
  line-height: 20px;
}
.top {
  overflow: hidden;
}
.unblur {
  border: 1px solid #333;
  cursor: pointer;
}
* {
  margin: 0;
  padding: 0;
}
.main_box {
  padding: 52px 0 0 0;
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  .top {
    overflow: hidden;
    .left {
      width: 574px;
      height: 574px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 566px;
      height: 352.8px;
      padding: 0 0 0 60px;
      float: right;
      .title_box {
        font-weight: 800;
        font-size: 20px;
        color: black;
      }
      .mon_box {
        margin-top: 28px;
        border-top: 1px #333 solid;
        border-bottom: 1px #333 solid;
        height: 52px;
        .l_box {
          float: left;
          border-right: 1px #333 solid;
          color: #3f3f3f;
          width: 50%;
          height: 52px;
          line-height: 52px;
          overflow: hidden;
          text-align: center;
          font-size: 14px;
          span {
            color: red;
          }
        }
        .r_box {
          float: left;
          color: #3f3f3f;
          width: 49%;
          height: 52px;
          line-height: 52px;
          overflow: hidden;
          text-align: center;
          font-size: 14px;
        }
      }
      .price_box {
        height: 32px;
        line-height: 32px;
        margin-top: 14px;
        font-size: 17px;
        color: #e60012;
      }
      .sku_box {
        p {
          line-height: 25px;
          font-size: 14px;
          margin: 15px 0;
          span {
            padding-left: 25px;
          }
        }
      }
      .color_box {
        margin: 10px 0 0;
        label {
          min-width: 50px;
          margin-right: 58px;
          // padding-top: 10px;
        }
        ul {
          display: inline-block;
          li {
            display: inline-block;

            img {
              width: 100%;
              height: 100%;
              vertical-align: bottom;
            }
          }
        }
        span {
          display: block;
          width: 34px;
          height: 34px;
          padding: 1px;
          box-sizing: border-box;
          transform: translateY(10px);
          cursor: pointer;
        }
      }
      .numbox {
        padding-top: 15px;
        height: 27px;
        // line-height: 42px;
        .num_inp {
          // width: 50px;
          height: 27px;
          float: left;
        }
        .l_txt {
          font-size: 14px;
          float: left;
          line-height: 27px;
          width: 50px;
          color: #3f3f3f;
          margin-right: 38px;
        }
        .r_txt {
          float: left;
          margin-left: 10px;
        }
        .spinner {
          overflow: hidden;
          // position: relative;
          margin-top: 2px;
          // border: 1px solid #3f3f3f;

          input {
            width: 20px;
            text-align: center;
          }
        }
      }
      .buy_btn {
        padding-top: 25px;
        height: 40px;
        ul {
          height: 40px;
          li {
            float: left;
            height: 40px;
            padding-right: 34px;
            a {
              display: block;
              height: 40px;
              width: 185px;
              text-align: center;
              line-height: 40px;
              color: #fff;
              font-size: 14px;
              overflow: hidden;
              background: #8e8e8e;
            }
          }
        }
      }
    }
  }
  .interested {
    padding: 40px 0 0 0;
    .title {
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      font-size: 14px;
    }
  }
  .active {
    background: #1c69d5 !important;
  }
}
</style>

