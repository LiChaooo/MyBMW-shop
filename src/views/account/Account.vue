<template>
<div id="account">
  <ul>
    <li>
      <h4>修改地址</h4>
      <div class="Inlist"> 
        <!-- 修改个人信息 -->
        <div class="Inlist-item" @click="editAddress()">
           <img src="../../assets/imgs/My_Profile.png" alt="">
           <span>修改地址</span>
           <span>信息</span>
        </div>
        <!-- 修改登录密码 -->
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>修改登录</span>
           <span>密码</span>
        </div>
      </div>
    </li>
    <li>
      <h4>我的需求</h4>
      <div class="Inlist"> 
        <!-- 我的需求 -->
        <div class="Inlist-item">
           <img src="../../assets/imgs/My_Profile.png" alt="">
           <span>预约试驾</span>
           <span>信息</span>
        </div>
        <!-- 底价咨询 -->
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>底价咨询</span>
           <span>密码</span>
        </div>
        <!-- 二手车预约看车 -->
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>二手车</span>
           <span>预约看车</span>
        </div>
        <!-- 二手车回购服务 -->
         <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>二手车</span>
           <span>回购服务</span>
        </div>
      </div>
    </li>
    <li>
      <h4>我的订单</h4>
      <div class="Inlist"> 
        <!-- 支付状态 -->
        <div class="Inlist-item">
           <img src="../../assets/imgs/My_Profile.png" alt="">
           <span>未支付</span>
           <span></span>
        </div>
        <!--  -->
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>已支付</span>
           <span></span>
        </div>
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>已完成</span>
           <span></span>
        </div>
         <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>退款/</span>
           <span>已取消</span>
        </div>
      </div>
    </li>
    <!-- 其他 -->
     <li>
      <h4>其他</h4>
      <div class="Inlist"> 
        <div class="Inlist-item">
           <img src="../../assets/imgs/My_Profile.png" alt="">
           <span>我的收藏</span>
           <span></span>
        </div>
        <!--  -->
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>浏览历史</span>
           <span></span>
        </div>
        <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>新车对比</span>
           <span></span>
        </div>
         <div class="Inlist-item">
            <img src="../../assets/imgs/edit.png" alt="">
           <span>二手车/</span>
           <span>对比</span>
        </div>
      </div>
    </li>
  </ul>
</div>
  
</template>

<script>
export default {
methods:{
  editAddress(){
    this.$router.push('/checkout')
  }
}
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
#account{
width: 100%;
height: 100%;
background-color: #f2f2f2;
}
ul{
width: 1400px;
min-width: 1200px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
}
ul li{
flex-shrink: 0;  
width:47%;
display: inline-block;
padding:18px 0;
}
ul li h4{
padding-left: 20px;
margin-bottom: 10px;
}
ul li .Inlist{
display: flex;
justify-content: flex-start;
padding: 15px;
background-color: #fff;
}
ul li .Inlist .Inlist-item{
width:18%;
margin-right: 10px;
display:flex;
flex-direction: column;
align-items: center;
}
ul li .Inlist .Inlist-item img{
  width: 60%;
  cursor: pointer;
}
ul li .Inlist .Inlist-item img:hover{
transform: rotateY(-30deg)
}
ul li .Inlist .Inlist-item span{
  font-size: 12px;
  color: gray;
  line-height: 20px;
    cursor: pointer;
}
</style>