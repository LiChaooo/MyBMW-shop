<template>
  <div>
    <div class="listsort">
      <div class="sortHead">
        <ul class="ulleft">
          <li class="nocursor">排序：</li>
          <li @click="sortBtn('default')" :class="sortType=='default'?'active':''">默认</li>
          <li @click="sortBtn('saleNum')" :class="sortType=='saleNum'?'active':''">销量</li>
          <li @click="sortBtnPrice" :class="sortType=='price'?'active':''">
            价格
            <i
              :class="priceClick==0?'el-icon-d-caret':priceClick==1?'el-icon-caret-top':'el-icon-caret-bottom'"
            ></i>
          </li>
        </ul>
        <ul class="ulright">
          <span>价格区间：</span>
          <input
            type="text"
            v-model="lowprice"
            class="inputprice"
            @focus="priceBtnisShow=true"
            placeholder="￥最低价"
          />
          <span>-</span>
          <input
            type="text"
            v-model="highprice"
            class="inputprice"
            @focus="priceBtnisShow=true"
            placeholder="￥最高价"
          />
          <div v-if="priceBtnisShow">
            <el-button size="mini" @click="priceBtn(true)">确定</el-button>
            <el-button size="mini" @click="priceBtn(false)">取消</el-button>
          </div>
        </ul>
      </div>
    </div>
    <div class="shoplist">
      <div class="shop" v-if="data.length!=0">
        <ul>
          <li v-for="(item,index) in data" :key="index" class="singleshop">
            <div class="detailimg">
              <router-link :to="'/detail/'+item.id">
                <img :src="item.img" />
              </router-link>
            </div>
            <div>
              <h1>BMW官方商城</h1>
              <h2>{{item.subtitle}}</h2>
              <p class="singleprice">
                ¥
                <span>{{item.price}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="noshop" v-if="data.length==0">没有查询到相关商品</div>
    </div>
  </div>
</template>

<script>
// import data from "../assets/js/bwmData";
export default {
  data() {
    return {
      data: [],
      olddata:[],
      sortType: "default",
      priceClick: 0,
      lowprice: "",
      highprice: "",
      priceBtnisShow: false
    };
  },
  computed: {
    searchData() {
      return this.$store.state.searchData;
    }
  },
  watch: {
    searchData(val) {
      this.data=val;
      this.olddata=this.data;
    }
  },
  created() {
    this.data =this.$store.state.searchData;
    this.olddata=this.data;
  },
  methods: {
    sortBtn(str) {
      this.priceClick = 0; //将价格的点击次数变为0
      this.sortType = str; //改变排序类型
      if (str == "default") {
         //默认就直接按id排序
        this.data =this.data.sort((a,b)=>{
          return a.id-b.id
        })
      } else {
        //不然就按照销量排序
        this.data = this.data.sort((a, b) => {
          return a.saleNumber - b.saleNumber;
        });
      }
      console.log(this.data);
    },

    //根据价格排序函数
    sortBtnPrice() {
      this.sortType = "price";
      this.priceClick++;
      if (this.priceClick % 2 == 1) {
        this.priceClick = 1;
        //将商品按价格升序排列
        this.data = this.data.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        this.priceClick = 2;
        //将商品按价格降序排列
        this.data = this.data.sort((b, a) => {
          return a.price - b.price;
        });
      }
      console.log(this.data);
    },

    //价格区间查询函数
    priceBtn(bool) {
      //确定按钮就就行查询筛选
      if (bool) {
        let { lowprice, highprice } = this.$data;
        if(lowprice==''&&highprice==''){
          this.priceBtnisShow = false;
          this.data=this.$store.state.searchData;
          return false;
        }
        //如果没有输入的左边价格，或者非法输入那就为0
        if (isNaN(parseFloat(lowprice))) {
          lowprice = 0;
        }
        //如果没有输入的右边价格，或者非法输入那就为0
        if (isNaN(parseFloat(highprice))) {
          highprice = 0;
        }
       //如果当先数据小于了原数据,就用原数据重新进行查询
        if(this.data<this.olddata){
          this.data=this.olddata;
        }
         //如果左边的价格小于右边的价格就升序排列，否则降序
        if (lowprice <= highprice) {
          this.data = this.data.filter(item => {
            if (item.price >= lowprice && item.price <= highprice) {
              return item;
            }
          });
        } else {
          this.data = this.data.filter(item => {
            if (item.price >= highprice && item.price <= lowprice) {
              return item;
            }
          });
          this.data = this.data.sort((b, a) => {
            return a.price - b.price;
          });
        }
      } else {
        //取消按钮清空价格区间输入框，并将数据跟新
        this.data=JSON.parse(JSON.stringify(this.$store.state.searchData));
        this.lowprice = "";
        this.highprice = "";
      }
      //隐藏两个按钮
      this.priceBtnisShow = false;
      console.log(this.data);
    }
  }
};
</script>

<style scoped>
h1 {
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  color: rgb(63, 63, 63);
  text-overflow: ellipsis;
  white-space: nowrap;
}
h2 {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: normal;
  color: rgb(63, 63, 63);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.singleprice {
  font-size: 14px;
  color: #e60012;
  margin-top: 13px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sortHead {
  height: 80px;
}
.inputprice {
  width: 58px;
  background: white;
  padding: 0 5px;
  border-radius: 3px;
  margin: 0 5px;
}
.listsort {
  min-width: 1200px;
  padding: 0 100px;
}
.shoplist {
  min-width: 1200px;
  padding: 0 100px;
}
.ulleft {
  height: 80px;
  line-height: 80px;
  float: left;
}
.ulleft li {
  margin-right: 20px;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  color: black;
}
.ulleft li.active {
  color: cornflowerblue;
}
.ulleft .nocursor {
  cursor: default;
}
.ulright {
  height: 80px;
  line-height: 80px;
  float: right;
  color: black;
  padding-right: 30px;
  position: relative;
}
.ulright li {
  float: left;
}
.ulright > div {
  text-align: center;
  position: absolute;
  height: 30px;
  line-height: 30px;
  right: 30px;
  bottom: 0px;
}
.ulright input {
  border: 1px solid blueviolet;
}
.ulright > div > button {
  margin-right: 13px;
  background: skyblue;
}
ul {
  overflow: hidden;
}
.singleshop {
  float: left;
  width: 18%;
  margin: 0 1%;
  height: 350px;
}
.singleshop > div {
  width: 100%;
}
.singleshop > div > a {
  display: inline-block;
  width: 100%;
  border: 1px solid rgb(233, 233, 233);
  position: relative;
  overflow: hidden;
}
.singleshop > div > a:hover img {
  transform: scale(0.9);
}
.singleshop > div > a > img {
  width: 100%;
  transition: all 0.4s;
}
.noshop{
  line-height: 420px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
</style>
