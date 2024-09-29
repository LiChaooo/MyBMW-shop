<template>
<div id="address">
  <div class="addressInfoBox">
    <!-- 弹框标题 -->
    <div class="title">
      <h4>新增收货地址</h4>
      <span @click="closePOP">x</span>
    </div>
    <el-form>
      <!-- 省市区 -->
      <el-form-item class="addressitem">
        <h4><i>*</i>所在区域</h4>
        <div class="pro_city_wrapper">
          <select class="province" v-model="lv1" @change="resetlv">
              <option value="-1">省份</option>
              <option :value="index" v-for="(item,index) in province" :key="index">{{item.Name}}</option>
          </select>
          <select class="citys" v-model="lv2">
              <option value="-1">城市</option>
              <option :value="index" v-for="(item,index) in citys" :key="index">{{item.Name}}</option>
          </select>
        </div>
        <div class="district-wrapper">
          <select class="district" v-model="lv3">
              <option value="-1">区县</option>
              <option :value="index" v-for="(item,index) in district" :key="index">{{item.Name}}</option>
          </select>
        </div>
      </el-form-item>
      <!-- 详细地址 -->
      <el-form-item class="addressitem">
        <h4><i>*</i>详细地址</h4>
        <textarea
        placeholder="请您如实填写详细收货地址,例如街道名称,门牌号马,楼层和房间等信息"
        v-model="addressInfo.street">
        </textarea>
      </el-form-item>
      <el-form-item class="addressitem">
        <h4>邮政编码</h4>
        <el-input placeholder="如您不清楚，请填写000000" v-model="addressInfo.postcode"></el-input>
      </el-form-item>
      <el-form-item class="addressitem">
        <h4><i>*</i>收货人</h4>
        <el-input type="text" placeholder="长度不能超过25个字符" v-model="addressInfo.name"></el-input>
      </el-form-item>
      <el-form-item class="addressitem">
        <h4><i>*</i>手机号码</h4>
        <el-input placeholder="请输入收货人手机" v-model="addressInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item class="addressitem default">
        <input type="checkbox" v-model="addressInfo.isdefault" :checked="addressInfo.isdefault">
        <span> 设置默认收货地址</span>
      </el-form-item>
      <el-form-item style="margin-top: 15px;" class="submit">
        <el-button type="primary" size="medium" @click="savaAddress()" 
        :disabled="saveStatus">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="module-dialog-layer" @click="closePOP"></div>
</div>
</template>

<script>
import AddressData from '../assets/js/city.js'
export default {
props:['i'],
data() {
  return {
    province: AddressData.State,
    lv1:'-1',
    lv2:'-1',
    lv3:'-1',
    addressInfo:{//初始化地址框的内容
      location:[
                {
                  name:'',
                  index:''
                },
                {
                  name:'',
                  index:''
                },
                {
                  name:'',
                  index:''
                },
              ],
      street:'',
      postcode:'',
      name:'',
      mobile:'',
      isdefault:''//表示是否勾选
    },
  }
},
created(){
  if(this.i!=-1){//用户点击传入的地址下标部位-1，是编辑
      this.addressInfo=JSON.parse(JSON.stringify(this.$store.state.userAddress[this.i]));
      this.lv1 = this.addressInfo.location[0].index //初始化三级联动的内容
      this.lv2 = this.addressInfo.location[1].index
      this.lv3 = this.addressInfo.location[2].index
  }
},
computed:{
  citys(){//二级城市list
    if(this.lv1!=-1){
        return this.province[this.lv1].City;
    }else{
       return []
    }
  },district(){//三级区县list
     if(this.lv2!=-1){
        return this.citys[this.lv2].Region;
    }else{
       return []
    }
  },
  saveStatus(){//控制地址保存按钮的bool变量
  let {street,name,mobile}=this.addressInfo
  let bool=false;
  if(street==''||name==''||mobile==''||this.lv1==-1||this.lv2==-1){
    bool=true;
  }
  console.log(bool)
  return bool;
  }
},
  methods:{
    resetlv(){
      this.lv2=this.lv3=-1;
    },
    closePOP(){// 触发checkout组件上关闭地址弹框的方法
      this.$emit('statusemit');
    },
    // 保存新增地址
  savaAddress(){
      let newObj = this.addressInfo;
      let region=this.lv3==-1?'':this.district[this.lv3].Name;//处理没有第三级的城市，区县认为空
        newObj.location=[ //向新地址数据包中，新增省市区的数据
              {
                name:this.province[this.lv1].Name,
                index:this.lv1
              },
              {
                name:this.citys[this.lv2].Name,
                index:this.lv2
              },
              {
                name:region,
                index:this.lv3
              }
            ];
     //触发store中的新增地址mutation并携带新地址数据包
      this.$store.commit('addAddress',{newObj,i:this.i});
      //关闭地址弹框
      this.closePOP();
    }
  }
}
</script>
<style scoped>
  #address .module-dialog-layer{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    opacity: .6;
}
#address .addressInfoBox{
  width: 400px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%,-50%);
  background-color: #fff;
}
#address .addressInfoBox .title{
  padding:6px 10px;
  color: #000;
  text-align: center;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  margin: 0;
}
#address .addressInfoBox .title h4{
  padding:4px 10px;
}
#address .addressInfoBox .title span{
  padding:6px;
  cursor: pointer;
}
#address .el-form-item {
    margin-bottom: 0;
    padding: 0 14px;
}
#address .el-form-item h4 i{
  color: red;
  padding: 4px;
}
.pro_city_wrapper{
  display: flex;
  justify-content: space-between;
}
.pro_city_wrapper select{
  width: 45%;
  display: inline-block;
border: 1px solid #ccc;
padding:6px 10px;
}
.district-wrapper{
 margin-top: 10px;
}
.district-wrapper .district{
  width: 100%;
  border: 1px solid #ccc;
  padding:6px 10px;
}
textarea{
  box-sizing: border-box;
}
.el-form-item .el-input__inner,.el-form-item textarea{
  width:100%;
  border: 1px solid #ccc !important;
  padding:10px;
  outline: none;
}
.default{
  display: flex;
  justify-content: center;
  align-items: center;
}
.default input{
  display: inline-block;
  width: 12px !important;
  outline: none;
}
div.submit{
  text-align: center;
}
.submit .el-button{
   width:40%;
   border-radius:0 !important;
   margin-bottom:15px;
}
</style>