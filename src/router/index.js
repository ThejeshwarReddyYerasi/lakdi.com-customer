import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../components/Product.vue'
import productList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'
import Login from '../components/Login.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:productId/:merchantId',
    name: 'product',
    component: Product
  },
  {
    path: '/productList',
    name: 'productList',
    component: productList
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
