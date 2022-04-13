import * as React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import RecoverPassword from "./components/RecoverPassword";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import AuthRequired from "./components/AuthRequired";
import { AuthContext } from "./context/AuthContextProvider";
import Products from "./components/Products";

function App() {
  return (
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
        </Route>

        {/* random routes */}
        <Route exact path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
