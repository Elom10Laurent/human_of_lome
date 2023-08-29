import { useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home_page } from "./pages/Home_page";
import { Login_page } from "./pages/Login_page";
import { Register_page } from "./pages/Register_page";
import { Account_page } from "./pages/Account_page";

import "./App.css";
import { UserContexteProvider } from "./UserContext";
import PulicationPage from "./pages/PulicationPage";

axios.defaults.baseURL = "http://127.0.0.1:3002";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContexteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="login" element={<Login_page />} />
          <Route path="Register" element={<Register_page />} />
          <Route path="account/:subpage?" element={<Account_page />} />
          <Route path="account/:subpage?/:id" element={<Account_page />} />

          <Route path="account/my_article/:id" element={<PulicationPage/>} />
        </Routes>
      </BrowserRouter>
    </UserContexteProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
