<template>
    <div class="account_box">
      <div class="account_bg">
        <h2 v-if="show">用户注册</h2>
        <h2 v-else>欢迎</h2>
      </div>
      <div class="account_info">
        <!-- logo图片 -->
            <div class="account_logo">
              <div>
                <img src="../../assets/imgs/logo.png" alt="logo">
              </div>
            </div>
        
        <div class="accountheader" v-if="show">
              <span class="elform-title">注册</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="show=false">去登录</el-button>
        </div>
        <div class="accountheader" v-else>
              <span class="elform-title">登录</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="show=true">去注册</el-button>
        </div>

        <!-- 注册区域 -->
        <el-form ref="regFormRef" :model="regForm" :rules="regFormRules" class="elform" v-if="show" autocomplete="off">
            <el-form-item prop="name" style="margin-top: 15px;" label=" 用户名" label-width="80px">
               <el-input placeholder="请设置用户名" v-model="regForm.name" prefix-icon="el-icon-s-custom" clearable arequired>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" style="margin-top: 15px;" label="密 码" label-width="80px">
                <el-input show-password placeholder="请输入注册密码" v-model="regForm.password" prefix-icon="el-icon-s-goods" clearable>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 15px;">
              <p class="loginItem">BMW账户隐私政策 与 BMW账户cookie政策</p>
              <el-checkbox v-model="checked" >我同意以上条款</el-checkbox>
              <el-button type="primary" class="btn-reg" @click="register">注 册</el-button>
            </el-form-item>
        </el-form>
        <!-- 登录区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="elform" v-else>
              <!-- 登录用户名 -->
             <el-form-item label="用户名" label-width="80px" prop="name" style="margin-top: 15px;">
                <el-input placeholder="请登录用户名" v-model="loginForm.name" prefix-icon="el-icon-s-custom" clearable>
                  <!-- //<el-button slot="preappend" icon="el-icon-s-custom"></el-button> -->
                </el-input>
              </el-form-item>
              <!-- 登录密码 -->
              <el-form-item label="密 码" label-width="80px" prop="password" style="margin-top: 15px;">
                <el-input show-password placeholder="请用户密码" v-model="loginForm.password" prefix-icon="el-icon-s-goods">
                </el-input>
              </el-form-item>

              <el-form-item style="margin-top: 15px;">
                <p class="loginItem">BMW账户隐私政策 与 BMW账户cookie政策</p>
                <el-checkbox v-model="checked" >我同意以上条款</el-checkbox>
                <el-button type="primary" class="btn-login" @click="login">登 录</el-button>
              </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    show:false,
    checked:false,
    //登录表单的数据绑定对象
    loginForm:{
      name:'',
    password:''
    },
     regForm:{
      name:'',
    password:''
    },
    //登录表单的验证规则对象
    loginFormRules:{
       //验证用户名是否合法
        name:[{required:true,message:"登录名不能为空",trigger:"blur"},
              {min:3,max:20,message:"用户名长度：3-20个字符",trigger:"blur"}],
        //验证密码是否合法
        password:[{required:true,message:"请输入登录密码",trigger:"blur"},
                  {min:6,max:10,message:"用登录密码：6-10个字符",trigger:"blur"}]
    },
    //注册表单验证规则对象
    regFormRules:{
      name:[{required:true,message:"用户名不能为空",trigger:"blur"},
            {min:3,max:20,message:"用户名长度：3-20个字符",trigger:"blur"}],
        //验证密码是否合法
      password:[{required:true,message:"密码不能为空",trigger:"blur"},
                {min:6,max:10,message:"密码长度：6-10个字符",trigger:"blur"}]
    }
  }
},
created() {
  console.log(this.$route.params);
  if(this.$route.params.type==0){//用户点击注册
      this.show=true;
  }else if(this.$route.params.type==1){
  this.show=false
    }
},
  methods:{
    register(){
      this.$refs.regFormRef.validate(async (valid,a)=>{
        //console.log(valid),valid 是个Boolean，验证通过为true，否则为false
        console.log(a)//未通过校验的字段
        if(!valid){return}
        //发起注册请求
        const {data:res}=await this.$axios.post("http://localhost:3000/users/reg",this.regForm);
              console.log(res)
          if(res.code!=1){
              return this.$message({
                message:res.msg,
                type:'error'
              })
          }else{
            // 注册成功
            this.$message({
                  message:res.msg,
                  type:'success'
                })
          }
      })
    },
    login(){
      this.$refs.loginFormRef.validate(async (valid)=>{
        //console.log(valid),valid 是个Boolean，验证通过为true，否则为false
        //console.log(a)//未通过校验的字段
        if(!valid){return}
        //发起登录请求 await 只能同在被async 修饰的方法中
        const {data:res}=await this.$axios.post("http://localhost:3000/users/login",this.loginForm);
              console.log(res)
          if(res.code!=1){
              return this.$message({
                message:res.msg,
                type:'error'
              })
          }else{
            this.$message({
                  message:res.msg,
                  type:'success'
                })
                //登录成功后，保存token到会话存储
                // window.localtorage.token=res.token;
                let username=localStorage.info=res.userinfo;
               console.log(username)
               this.$store.commit('changeLoginMut')
                //编程式跳转到home页面
                this.$router.push('/');
          }
      })
    }
  },
}
</script>

<style>
.account_box{
  width: 100%;
  height:100%;
  background-color: #fff;
  overflow: hidden;
}
.account_box .account_bg{
  float: left;
  width: 50%;
  height: 100vh;
  background: url('../../assets/imgs/login-bg.png') no-repeat left;
}
.account_box .account_bg h2{
font-size: 50px;
font-weight: 600;
color: #fff;
letter-spacing: 10px;
padding-top: 30%;
padding-left: 30%;
}
.account_box .el-input {
width: 80%;
padding:10px 0;
}
.account_box .el-form-item__label{
  padding-top: 10px;
}
 .el-input-group__prepend {
    background-color: #fff;
  }
  .account_info{
    width: 45%;
    float:left;
    margin-right: 5%;
  }
  .account_info .accountheader{
    padding: 2% 11%;
    font-size: 18px;
  }
  .account_info .el-form{
    padding:10%;
    box-shadow:none !important;
    border: none;
  }
  .account_info .el-form .elform-title{
    color: #1c69d4;
    font-weight: 600;
  }
 .account_info .account_logo{
   text-align: right;
   padding-bottom: 20px;
 }
 .account_info .account_logo div{
   padding-right: 10%;
   display: inline-block;
   width: 103px;
   height: 115px;
   margin-bottom: 20px;
 }
 .account_info .account_logo div img{
   width: 100%;
   height: 100%;
 }
 .loginItem{
 text-decoration-line:underline;
}
.el-checkbox__inner{
border-color: gray !important;
}
 .btn-login,.btn-reg{
  display: inline-block;
  width: 100%;
}
.el-button--primary{
font-weight: 600 !important;
font-size: 14px !important;
padding:10px 0 !important;
margin-top:30px !important;
}
</style>