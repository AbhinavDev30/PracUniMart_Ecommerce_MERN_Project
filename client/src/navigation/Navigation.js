import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./Routes";
// import Header from "../component/Header";

function Navigation() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.contact.name}
            element={ROUTES.contact.component}
          />
          <Route path={ROUTES.about.name} element={ROUTES.about.component} />
          <Route path={ROUTES.login.name} element={ROUTES.login.component} />
          <Route
            path={ROUTES.support.name}
            element={ROUTES.support.component}
          />

          <Route
            path={ROUTES.register.name}
            element={ROUTES.register.component}
          />
          <Route
            path={ROUTES.universityAdmin.name}
            element={ROUTES.universityAdmin.component}
          />
          <Route
            path={ROUTES.departmentAdmin.name}
            element={ROUTES.departmentAdmin.component}
          />
          <Route
            path={ROUTES.productAdmin.name}
            element={ROUTES.productAdmin.component}
          />
          <Route path={ROUTES.home.name} element={ROUTES.home.component} />
          <Route
            path={ROUTES.department.name}
            element={ROUTES.department.component}
          />
          <Route
            path={ROUTES.product.name}
            element={ROUTES.product.component}
          />
          <Route
            path={ROUTES.productDetail.name}
            element={ROUTES.productDetail.component}
          />
          <Route path={ROUTES.cart.name} element={ROUTES.cart.component} />
          <Route path={ROUTES.first.name} element={ROUTES.first.component} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;
