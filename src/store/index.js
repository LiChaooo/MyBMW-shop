import Vue from 'vue'
import Vuex from 'vuex'
import searchData from '../assets/js/bwmData'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        wherego: -1, //lv用于保存nav所处位置
        cartData: [{
                id: 0,
                type: 0, //车模
                img: require("../assets/imgs/carmodel_blue.png"),
                subtitle: "Z4汽车模型 蓝色 可遥控",
                oldprice: "",
                price: 712,
                saleNumber: 9,
                buyNumber: 1,
                checked: true
            },
            {
                id: 1,
                type: 0, //车模
                img: require("../assets/imgs/CSLmodel.png"),
                subtitle: "BMW 模型车 3.0 CSL R Hommage 1:18",
                oldprice: "",
                price: 1400,
                saleNumber: 9,
                buyNumber: 2,
                checked: true
            },
            {
                id: 2,
                type: 1, //箱包
                img: require("../assets/imgs/bagone.png"),
                subtitle: "BMW钱包 不带硬币袋 男士短款钱夹",
                oldprice: "",
                price: 1410,
                saleNumber: 6,
                buyNumber: 3,
                checked: true
            }
        ], //lv用于存放用户购物车信息
        searchData, //lv用于存放导航栏input框查询到的数据
        bwmData: searchData, //jl数据
        userAddress: [{
            location: [{
                    name: '北京',
                    index: '0'
                },
                {
                    name: '朝阳',
                    index: '2'
                },
                {
                    name: '',
                    index: '-1'
                },
            ],
            street: '长安街3号',
            postcode: '409912',
            name: 'dora',
            mobile: '1898384827',
            isdefault: true, //控制是否设置为默认地址
        }, {
            location: [{
                    name: '山西',
                    index: '3'
                },
                {
                    name: '太原',
                    index: '0'
                },
                {
                    name: '小店区',
                    index: '0'
                },
            ],
            street: '大唐街3号',
            postcode: '409912',
            name: '星星',
            mobile: '1898384827',
            isdefault: false//控制是否设置为默认地址
        }],//hr 用于存放用户的地址信息
        islogin:false
    },
    mutations: {
        //lv用于保存导航栏的激活状态
        navActSendMut(state, num) {
            state.wherego = num;
        },
        //lv将导航栏输入的内容与全部商品进行模糊查询,并给state.searchData赋值
        navsearchMut(state, searchV) {
            state.searchData = searchData.filter(itme => {
                if (itme.subtitle.indexOf(searchV) != -1) {
                    return itme
                }
            })
        },
        //lv购物车改变所点击的商品的选择状态
        changeCheckMut(state, id) {
            state.cartData.forEach(item => {
                if (item.id == id) {
                    item.checked = !item.checked;
                    return false;
                }
            })
        },
        //lv购物车改变购买数量
        changeBuyNumMut(state, obj) {
            state.cartData.forEach(item => {
                if (item.id == obj.id) {
                    let buyNumber = item.buyNumber;
                    buyNumber = buyNumber + obj.num;
                    if (buyNumber == 0) {
                        buyNumber = 1;
                    }
                    item.buyNumber = buyNumber;
                    return false
                }
            })
        },
        //lv购物车删除单个商品
        delSingleMut(state, id) {
            state.cartData.forEach((item, i) => {
                if (item.id == id) {
                    state.cartData.splice(i, 1);
                    return false;
                }
            })
        },
        //lv购物车点击全选按钮触发事件
        checkedAllMut(state) {
            let bool = this.getters.infoAll.checkedAll;
            state.cartData.forEach(item => {
                item.checked = !bool;
            })

        },
        //lv根据选着分类过滤信息并赋值给searchData
        searchDataTypeMut(state, num) {
            if (num == 100) {
                state.searchData = searchData;
            } else {
                state.searchData = searchData.filter(item => {
                    if (item.type == num) {
                        return item;
                    }
                })
            }

        },
        //lv生活精品里进行多种类型数据过滤并赋值给searchData
        goodlifeMut(state, lilist) {
            var checkedTpyeAll=lilist.filter((item,i)=>{
                if(i>0){
                    return item.checked;
                }
            })
            if(checkedTpyeAll.length==lilist.length-1||checkedTpyeAll.length==0){
                state.searchData=searchData;
            }else{
                let newsearchData=[];
                searchData.filter(item=>{
                    for(var i=0;i<checkedTpyeAll.length;i++){
                        if(item.type==checkedTpyeAll[i].actNum){
                            newsearchData.push(item);
                        }
                    }
                })
                state.searchData=newsearchData;
            }
        },
        // hr 新增用户地址Mutation
        addAddress(state, obj) {
            console.log(obj.i )
            if (obj.i ==-1) {
                state.userAddress.push(obj.newObj);//新增地址
            } else if(obj.i!=-1){
                state.userAddress[obj.i]= obj.newObj;//修改地址
            }
        },
        delAddressMUT(state, index){// hr 删除用户收获地址
        state.userAddress.splice(index.i,1)
        },
        // 添加至购物车的商品列表
        addSingleMut(state, obj) {
            let bool = true;
            state.cartData.forEach((item) => {
                if (item.id == obj.single.id) {
                    item.buyNumber += obj.num
                    bool = false;
                    return bool
                }
            })
            if (bool) {
                obj.single.buyNumber = obj.num
                state.cartData.push(obj.single)
                console.log(state.cartData)
            }

        },
        // 即将购买的商品信息
        buysingleMut(state, obj) {
            let bool = true
            state.cartData.forEach((item) => {
                item.ischecked = false
                if (item.id == obj.single.id) {
                    item.buyNumber += obj.num
                    bool = false
                    return bool
                }
            })
            obj.single.buyNumber = obj.num
            // obj.single.ischecked=true
            state.cartData.push(obj.single)
        },
        changeLoginMut(state){//初始化用户登录状态
            state.islogin=true
        }
    },
    getters: {
        infoAll(state) {
            let checkedAll = true;
            let checkedAllPrice = 0;
            let loginstatus=state.islogin;
            state.cartData.forEach(item => {
                if (!item.checked) {
                    checkedAll = false;
                } else {
                    checkedAllPrice += item.buyNumber * item.price
                }
            })
            return {
                checkedAll, //判断是否全选
                checkedAllPrice,//计算所选中的总价格
                loginstatus 
            }
        },
        wherego(state) {
            return state.wherego; //表示nav的激活状态
        },
        selectedGoods(state) {
            return state.cartData.filter((item) => {
                return item.checked
            })
        }
    }

})
export default store;