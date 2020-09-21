import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'
import Home from "../view/Home";
import ShopList from "../view/ShopList";
import OrderList from "../view/OrderList";
import UserCenter from "../view/UserCenter";
import Login from "../view/Login";
import Register from "../view/Register";
import BookDetailPage from "../view/BookDetailPage";
import AdminOrderMng from "../view/AdminOrderMng";
import AdminOrderDetail from "../view/AdminOrderDetail";
import AdminUserMng from "../view/AdminUserMng";
import Statics from "../view/Statics";
import AdminStaticsBook from "../view/AdminStaticsBook";
import AdminStaticsUser from "../view/AdminStaticsUser";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name:'Register',
      component: Register
    },
    {
      path: '/shopList',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/bookDetail',
      name: 'BookDetailPage',
      component: BookDetailPage
    },
    {
      path: '/admin/order',
      name: 'AdminOrderMng',
      component: AdminOrderMng
    },
    {
      path: '/admin/order/detail',
      name: 'AdminOrderDetail',
      component: AdminOrderDetail
    },
    {
      path: '/admin/user',
      name: 'AdminUserMng',
      component: AdminUserMng
    },
    {
      path: '/statics',
      name: 'Statics',
      component: Statics
    },
    {
      path: '/admin/statics/book',
      name: 'AdminStaticsBook',
      component: AdminStaticsBook
    },
    {
      path: '/admin/statics/user',
      name: 'AdminStaticsUser',
      component: AdminStaticsUser
    }
  ]
})
