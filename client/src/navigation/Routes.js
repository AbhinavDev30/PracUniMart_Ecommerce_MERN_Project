import About from "../container/about/About";
import Department from "../container/admin/department/Department";
import Product from "../container/admin/product/Product";
import University from "../container/admin/university/University";
import Contact from "../container/contact/Contact";
import First from "../container/first/First";
import Register from "../container/register/Register";
import Support from "../container/support/Support";
import Cart from "../container/user/Cart/Cart";
import UserDepartment from "../container/user/department/UserDepartment";
import Home from "../container/user/home/Home";
import UserProduct from "../container/user/product/UserProduct";
import UserProductDetail from "../container/user/productdetail/UserProductDetail";
import Login from "../login/Login";

const ROUTES = {
  contact: {
    name: "/contact",
    component: <Contact />,
  },
  about: {
    name: "/about",
    component: <About />,
  },
  support: {
    name: "/support",
    component: <Support />,
  },
  login: {
    name: "/login",
    component: <Login />,
  },
  register: {
    name: "/register",
    component: <Register />,
  },
  universityAdmin: {
    name: "/universityAdmin",
    component: <University />,
  },
  departmentAdmin: {
    name: "/departmentAdmin",
    component: <Department />,
  },
  productAdmin: {
    name: "/productAdmin",
    component: <Product />,
  },

  home: {
    name: "/home",
    component: <Home />,
  },

  department: {
    name: "/department",
    component: <UserDepartment />,
  },
  product: {
    name: "/product",
    component: <UserProduct />,
  },
  productDetail: {
    name: "/productDetail",
    component: <UserProductDetail />,
  },
  cart: {
    name: "/cart",
    component: <Cart />,
  },
  first: {
    name: "/",
    component: <First />,
  },
};

export default ROUTES;
