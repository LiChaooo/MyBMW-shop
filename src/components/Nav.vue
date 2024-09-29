<template>
  <div class="topnav">
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li :class="navAct==0?'actli':''" @click="navActSend(0)">
          <router-link to="/">首页</router-link>
        </li>
        <li :class="navAct==1?'actli':''" @click="navActSend(1)">
          <router-link to="/goodlife">生活精品</router-link>
        </li>
        <li :class="navAct==2?'actli':''" @click="navActSend(2)">
          <router-link to="/orginalfit">原厂附件</router-link>
        </li>
        <li :class="navAct==3?'actli':''" @click="navActSend(3)">
          <router-link to="/carcare">汽车养护</router-link>
        </li>
        <li :class="navAct==4?'actli':''" @click="navActSend(4)">
          <a href="https://www.bmw.com.cn/zh/index.html">新车在线销售</a>
        </li>
        <li :class="navAct==5?'actli':''" @click="navActSend(5)">
          <a href="https://bmwusedcar.bmw.com.cn/portal/bmwuc/index.html?t=1577101071348">官方认证二手车</a>
        </li>
      </ul>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入关键词" v-model="searchV" @keyup.enter="navsearch">
        <template slot="append">
          <i class="el-icon-search" @click="navsearch"></i>
        </template>
      </el-input>
    </div>
    <span class="login">
      <i class="el-icon-shopping-cart-2" @click="login('/cart')"></i>
      <span v-if="!loginstatus">
        <span @click="login('/users/1')">登录</span>|
        <span @click="login('/users/0')">注册</span>
      </span>
      <span v-else>
        <span class="namespan">{{username}}</span>|
        <span @click="login('quit')">退出</span>
      </span>
    </span>
    <img src="../assets/imgs/navLogo.png" class="navlogo" />
    <ul class="asideright">
      <li>
        <router-link to>
          <i class="el-icon-s-flag"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/account">
          <i class="el-icon-s-custom"></i>
        </router-link>
      </li>
      <li>
        <router-link to>
          <i class="el-icon-s-comment"></i>
        </router-link>
      </li>
      <li>
        <router-link to>
          <i class="el-icon-phone"></i>
        </router-link>
      </li>
      <li>
        <router-link to>
          <i class="el-icon-star-on"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchV: "",
      username:'',
     loginstatus:false
    };
  },
  computed: {
    navAct(){
      return this.$store.getters.wherego;
    },
    infoAll(){
      console.log(this.$store.state.islogin)
      return this.$store.state.islogin;
    }
  },
  methods: {
    //传递激活的导航
    navActSend(num){
      this.$store.commit('navActSendMut',num);
    },
    navsearch() {
      this.$store.state.wherego = -1;
      this.$store.commit("navsearchMut", this.searchV);
      this.$router.push({
        path: "/searchlist"
      });
    },
    login(str) {
      if (str != "quit") {
        if(str=='/cart'){
          this.navAct = -1;
        }
        this.$router.push({
          path: str
        });
      }else{
        this.$store.state.islogin=false;
        this.loginstatus=false;
        localStorage.clear();
      }
    }
  },created() {
      this.loginstatus=this.$store.state.islogin;
      if(localStorage.info){
        this.username=localStorage.info;
      }
  },
};
</script>

<style scoped>
.namespan{
  cursor: default !important;
}
.login {
  color: white;
  margin-left: 10px;
}
.login > i {
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}
.login > i:hover {
  color: #1c69d4;
}
.login > span > span {
  padding: 0 5px;
  cursor: pointer;
}
.topnav {
  position: sticky;
  top: 0px;
  z-index: 999;
}
.actli a {
  color: #1c69d4 !important;
}
.topnav {
  height: 80px;
  background: #8e8e8e;
  padding: 0 100px;
  min-width: 1200px;
}
.nav li {
  height: 80px;
  float: left;
  line-height: 80px;
  margin-right: 20px;
}
.nav li a {
  color: white;
  font-size: 16px;
}
.nav li a:hover {
  color: #1c69d4;
}
.search {
  display: inline-block;
  line-height: 80px;
}
.search input{
  outline: none
}
.el-icon-search {
  cursor: pointer;
  font-size: 30px;
}
.el-icon-search:hover {
  color: #1c69d4;
}
.navlogo {
  vertical-align: top;
  margin-top:10px;
  height: 60px;
  float: right;
}
.asideright {
  font-size: 40px;
  position: fixed;
  right: 10px;
  top: 200px;
}
.asideright li {
  padding: 10px;
  background: white;
}
.asideright li:hover {
  background: #1c69d4;
}
.asideright li:hover a {
  color: white;
}
.asideright li a {
  color: #1c69d4;
}
</style>