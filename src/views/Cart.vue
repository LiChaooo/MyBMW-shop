<template>
  <div class="cart">
    <p class="cart_title">购物车</p>
    <div class="shopping" v-if="cartData.length!=0">
      <div class="shopping_title">BMW售后服务官方商城</div>
      <table>
        <tr class="table_head"> 
          <th class="choose">
            <span class="el-icon-success" :class="infoAll.checkedAll?'blue':''" @click="checkedAll"></span>全选
          </th>
          <th class="product" colspan="2">产品</th>
          <th class="num">数量</th>
          <th class="price">单价</th>
          <th class="total">合计</th>
          <th class="operation">操作</th>
        </tr>
        <tr v-for="(item,index) in  cartData" :key="index">
            <td>
              <span
                class="el-icon-success"
                :class="item.checked?'blue':''"
                @click="changeCheck(item.id)"
              ></span>
            </td>
            <td class="tailimg">
              <img :src="item.img" alt />
            </td>
            <td class="tail">
              <div class="productname">BMW正版授权</div>
              <div class="productcolor">{{item.subtitle}}</div>
              <div class="producttime">预计发货时间：付款后48小时内</div>
            </td>
            <td>
              <span class="buyNumber1" @click="changeBuyNum({id:item.id,num:-1})">-</span>
              <span class="buyNumber">{{item.buyNumber}}</span>
              <span class="buyNumber1" @click="changeBuyNum({id:item.id,num:1})">+</span>
            </td>
            <td>￥{{item.price}}</td>
            <td>￥{{item.buyNumber*item.price}}</td>
            <td>
              <el-button
                type="success"
                icon="el-icon-more-outline"
                circle
                @click="goDtail(item.id)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delSingle(item.id)"></el-button>
            </td>
        </tr>
      </table>
      <div class="paydiv">
        <div class="sub">
          合计:
          <span class="price">
            ￥
            <span class="subPrice">{{infoAll.checkedAllPrice}}</span>
          </span>
          <router-link to="/checkout" class="submit-button">
            <el-button type="primary">支付</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="noshopping" v-if="cartData.length==0">
      <h1 class="carnull">您的购物车中还没有商品</h1>
      <h2>
        <router-link to="/">
          <el-button type="warning" round>现在选购</el-button>
        </router-link>
      </h2>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeCheck(id) {
      this.$store.commit("changeCheckMut", id);
    },
    changeBuyNum(obj) {
      this.$store.commit("changeBuyNumMut", obj);
    },
    delSingle(id) {
      this.$store.commit("delSingleMut", id);
    },
    checkedAll() {
      this.$store.commit("checkedAllMut");
    },
    goDtail(id) {
      this.$router.push({
        path: "/detail/" + id
      });
    }
  },
  computed: {
    cartData() {
      return this.$store.state.cartData;
    },
    infoAll() {
      return this.$store.getters.infoAll;
    }
  },
  created() {
    this.$store.state.wherego = -1;
  },
};
</script>

<style scoped>
.buyNumber1 {
  cursor: pointer;
}
.buyNumber {
  margin: 0 12px;
}
h2 {
  text-align: center;
  line-height: 80px;
}
.carnull {
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  line-height: 360px;
}
.table_head {
  position: sticky;
  top: 80px;
}
.shopping {
  min-height: 600px;
}
.paydiv {
  overflow: hidden;
}
.paydiv .sub {
  float: right;
  padding: 10px 0;
}
.sub button {
  width: 120px !important;
  margin-left: 30px;
}
.productname {
  color: #5e5e5e;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  margin: 0 0 10px 0;
}
.productcolor {
  margin: 0 0 10px;
  color: #888;
}
.producttime {
  color: #0e77d9;
  margin: 0 0 10px;
}
.table_head {
  height: 50px;
}
.el-icon-success {
  color: rgb(214, 188, 188);
  cursor: pointer;
  font-size: 20px;
}
.tail {
  width: 220px;
}
.tailimg {
  width: 380px;
}
.tailimg img {
  max-height: 220px;
  width: 380px;
}
table {
  text-align: center;
}
.choose {
  width: 60px;
}
.product {
  width: 600px;
}
.num {
  width: 150px;
}
.price {
  width: 150px;
}
.total {
  width: 150px;
}
.operation {
  width: 218px;
}
.blue {
  color: violet;
}
.cart {
  min-width: 1200px;
}
.cart_title {
  padding: 0 100px;
  background: white;
  line-height: 60px;
}
.shopping,
.noshopping {
  padding: 0 100px;
  min-width: 1200px;
}
.shopping_title {
  margin: 20px auto 10px;
  display: block;
  position: relative;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  color: #888;
}
</style>