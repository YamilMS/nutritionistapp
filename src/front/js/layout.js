import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Sessions } from "./pages/sessions";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { Nutritionistprofile } from "./component/nutritionistprofile";
import { Clientprofile } from "./component/clientprofile";
import { Mysessions } from "./pages/mysessions";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="h-100">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Sessions />} path="/sessions" />
            <Route element={<Mysessions />} path="/mysessions" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Nutritionistprofile />} path="/nutriprofile" />
            <Route element={<Clientprofile />} path="/clientprofile" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
