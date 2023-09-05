import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import {Edit as SoapEdit, View as SoapView, List as SaopList, Error} from "./pages"
import { Footer, Header } from "./components";

function BasicLayout() {
  return (
    <div className="min-w-screen min-h-screen">
      <Header />
      <div className="px-[1rem] md:px-[5rem] lg:px-[6rem] my-20">
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<SaopList />} />
        <Route path="/view/:id" element={<SoapView />} />
        <Route path="/edit/:id" element={<SoapEdit />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
