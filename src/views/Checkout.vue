  <template>
    <div id="checkout">
      <div class="containner">
        <!-- 使用默认地址 -->
        <div class="chooseAddress">
          <h4>使用默认地址</h4>
          <el-radio-group v-model="yesno">
              <el-radio :label="index" v-for="(item,index) in addresslist" :key="index" style="display:block;padding:10px">
                  <span>
                    {{ item.name}} 
                    {{ item.street}} 
                    {{ item.postcode}} 
                    {{ item.mobile}}
                  </span>
                  <el-button size="mini" type="danger" @click="showAddressPOP(index)">修改</el-button>
                  <el-button size="mini" type="danger" @click="del(index)">删除</el-button>
              </el-radio>
            </el-radio-group>
          <div class="editAddress">
            <a href="javascript:;" @click="showAddressPOP(-1)">新增收货地址</a>
            <a href="#">选择其他地址</a>
          </div>
        </div>
        <!-- 确认订单信息-->
        <div class="orderList">
          <h4>确认订单信息</h4>
            <table>
              <thead>
                <tr align="center">
                  <th>商品</th>
                  <th>商品名称</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>优惠方式</th>
                  <th>小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in selectedGoods" :key="index">
                  <td class="img">
                    <img :src="item.img" :alt="index">
                  </td>
                  <td>
                    <h4>{{item.subtitle}}</h4>
                    <span>颜色：黑色</span>
                    <span class="sendtime">预计发货时间：付款后48小时内</span>
                  </td>
                  <td>￥ {{item.price}}</td>
                  <td>{{item.buyNumber}}</td>
                  <td>省￥ {{item.price-item.oldprice}}</td>
                  <td>￥ {{item.buyNumber*item.price}}</td>
                </tr>
              </tbody>
            </table>
        </div>
        <!--费否开发票-->
        <div class="invoice">
          <h4>是否开发票</h4>
          <el-radio-group v-model="yesno">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
          <!-- 操作发票 -->
          <div>
            <a href="#">新增发票</a>  
            <a href="#">修改发票</a>  
            <a href="#">选择其他发票</a>
          </div>
        </div>
        <!--选择支付方式-->
        <div class="payWay">
             <input type="checkbox">  <label> 支付宝</label>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
           <button>提交订单</button>
        </div>
      </div>
      <AddressPop v-if="showPOP" @statusemit='showPOP=false' :i="idx"></AddressPop>
    </div>
  </template>
  <script>
  import AddressPop from "../components/Address";
  export default {
   components:{
      AddressPop:AddressPop
    },
    data () {
          return {
            "yesno":1,
            'default':1,
            "showPOP":false,//控制地址弹框的显示与隐藏
            'idx':-1,//用户收货地址的下标
          };
        },
    created() {
    this.$store.state.wherego = -1;
    },
    "computed":{
      addresslist(){
        return this.$store.state.userAddress;
      },
      selectedGoods(){
        console.log(this.$store.getters.selectedGoods)
        return this.$store.getters.selectedGoods;
      }
    },
    "methods":{
      showAddressPOP(i){//点击显示地址弹框
          this.showPOP=true;
          this.idx=i;
        },
      del(index){
        this.$store.commit('delAddressMUT',index)
      }
    //console.log(this.showPOP)
      }
  };
  </script>

  <style scoped>
   
  #checkout{
  width: 100%;
  height: 100%;
  }
  #checkout h4{
    font-size: 14px;
    color: #222;
    padding-bottom: 15px;
  }
  #checkout .containner{
    width: 1200px;
    margin: 0 auto;
  }
  #checkout .containner .chooseAddress{
  width: 100%;
  height: 100%;
  padding:15px 0;
  }
  .radiogroup .addresslist{
  display: block;
  margin-bottom: 20x;
  }
  .editAddress{
    padding: 15px 0;
  }
  .editAddress a{
    color: rgb(55, 55, 248);
    margin-right: 15px;
  }
  /* oderList样式 */
   #checkout .orderList table{
     width: 100%;
     border: 1px solid #f7f7f7;
     border-collapse: collapse;
     padding: 10px;
   }
  #checkout .orderList thead{
    background-color: #f7f7f7;
  }
  #checkout .orderList thead tr th{
    text-align: left;
    padding: 10px;
  }
  .orderList tbody tr{
     border: 1px solid #eee;
  }

  .orderList tbody tr td{
    box-sizing: border-box;
    width: 200px;
    padding: 10px;
    vertical-align: top;
  }
  .orderList tbody tr :first-child{
    width: 200px;
  }
  .orderList tbody tr :first-child img{
    border: 1px solid #eee;
    height: 150px;
  }
   .orderList tbody tr td:nth-child(2){
     width: 300px;
     display: flex;
     flex-direction: column
   }
  .orderList tbody tr td:nth-child(2) .color{
    color: #222;
    font-size: 12px;
    line-height: 14px;
  }
  .orderList tbody tr td:nth-child(2) .sendtime{
    color: rgb(66, 66, 250);
    font-size: 12px;
    line-height: 22px;
  }
  .invoice{
    width: 100%;
    padding: 10px 15px;;
    margin-bottom: 15px;
  }
  .invoice .el-checkbox-group{
    line-height: 40px;
  }
.invoice>div{
line-height: 20px;
padding:0 10px;
}
.invoice>div a{
color:  rgb(55, 55, 248);
margin-right: 15px;
}
.payWay{
padding: 10px;
color: rgb(55, 55, 248);
}
.submit {
  text-align: right;
  margin-bottom:30x;
}
.submit button{
 padding: 8px 15px;
 background-color: #409eff;
 color: #fff;
}
.el-radio-group .ei-radio{
  display: inline-block !important;
  height: 30px !important;
}
.el-button--mini, .el-button--mini.is-round{
 padding:6px;
 }
</style>
  