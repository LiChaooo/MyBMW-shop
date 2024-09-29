import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '../components/Nav.vue'
import ListSort from '../components/ListSort.vue'
import Footer from '../components/Footer.vue'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Detail from '../components/Detail.vue'
import RegisterLogin from "@/views/account/RegisterLogin";
import Checkout from '@/views/Checkout'
import CarCare from '../views/CarCare'
import OriginalFit from '../views/OriginalFit'
import GoodLife from '../views/GoodLife'
import Account from '@/views/account/Account'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        //吕奎路由
        {
            path: '/',
            components: {
                nav: Nav,
                default: Home,
                footer: Footer
            },
        },
        {
            path: '/searchlist',
            components: {
                nav: Nav,
                default: ListSort,
                footer: Footer
            }
        },
        {
            path: '/cart',
            components: {
                nav: Nav,
                default: Cart,
                footer: Footer
            }
        },
        {
            path: '/carcare',
            components: {
                nav: Nav,
                default: CarCare,
                footer: Footer
            }
        },
        {
            path: '/orginalfit',
            components: {
                nav: Nav,
                default: OriginalFit,
                footer: Footer
            }
        },
        {
            path: '/goodlife',
            components: {
                nav: Nav,
                default: GoodLife,
                footer: Footer
            }
        },
        //蒋林路由
        {
            path: '/detail/:idx',
            components: {
                nav: Nav,
                default: Detail,
                footer: Footer,
            },
            name: 'detail'
        },
        //黄蓉路由
        {
            path: "/users/:type",
            component: RegisterLogin
        },
        {
            path: "/checkout",
            components: {
                nav: Nav,
                default: Checkout,
                footer: Footer,
            },
            beforeEnter: (to, from, next) => {
                console.log(to, from, next);
                if (localStorage.info) {
                    next()
                } else {
                    router.push('/users/1')
                }
            }
        },
        {
            path: "/account",
            components: {
                nav: Nav,
                default: Account,
                footer: Footer,
            },
            beforeEnter: (to, from, next) => {
                console.log(to, from, next);
                if (localStorage.info) {
                    next()
                } else {
                    router.push('/users/1')
                }
            }
        }
    ]

})

export default router