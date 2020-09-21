import {Input, Card, Form, Button, FormItem, DatePicker, Popover} from "element-ui";
import {Container, Header, Main, Row, Col, Divider, Alert, MessageBox, Upload} from "element-ui"
import Menu from "./Menu";
import AdminMenu from "./AdminMenu";
import Head from "./Head";
import Book from "./Book";
import BookDisplay from "./BookDisplay";
import ShopItem from "./ShopItem";
import ShopCart from "./ShopCart";
import LoginCard from "./LoginCard";
import AdminHead from "./AdminHead";

function plugins(Vue) {
  Vue.component(Input.name, Input);
  Vue.component(Card.name, Card);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Button.name, Button);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(Popover.name, Popover);
  Vue.component(Container.name, Container);
  Vue.component(Header.name, Header);
  Vue.component(Main.name, Main);
  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
  Vue.component(Divider.name, Divider);
  Vue.use(Alert);
  Vue.prototype.$alert = MessageBox.alert;
  Vue.use(Upload);
  Vue.component('Head', Head);
  Vue.component('AdminHead', AdminHead);
  Vue.component('Menu', Menu);
  Vue.component('AdminMenu', AdminMenu);
  Vue.component('Book', Book);
  Vue.component('BookDisplay', BookDisplay);
  Vue.component('ShopItem', ShopItem);
  Vue.component('ShopCart', ShopCart);
  Vue.component('LoginCard', LoginCard);
}

export default plugins;
