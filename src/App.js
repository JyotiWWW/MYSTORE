import * as React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContextProvider";
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const RecoverPassword = React.lazy(() =>
  import("./components/RecoverPassword")
);
const Layout = React.lazy(() => import("./components/Layout"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));
const Home = React.lazy(() => import("./components/Home"));
const MyAccount = React.lazy(() => import("./components/MyAccount"));
const AuthRequired = React.lazy(() => import("./components/AuthRequired"));
const Products = React.lazy(() => import("./components/Products"));
const Cart = React.lazy(() => import("./components/Cart"));
const Orders = React.lazy(() => import("./components/Orders"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          {/* open Routes */}
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/recoverpassword"
            element={<RecoverPassword />}
          ></Route>

          {/* protected routes */}
          <Route element={<AuthRequired />}>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/myaccount" element={<MyAccount />}></Route>
            <Route exact path="/products" element={<Products />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route exact path="/orders" element={<Orders />}></Route>
          </Route>

          {/* random routes */}
          <Route exact path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
