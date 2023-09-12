import logo from "./logo.svg";
import "../src/assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import HomePage from "./pages/Chat/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LogoutPage from "./pages/Auth/LogoutPage";
import Test from "./components/Test/Test";
import FriendRequestTest from "./components/Test/FriendRequestTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}

        {/* test socket */}
        <Route path="/test" element={<Test />} />
        <Route path="/friendRequestTest" element={<FriendRequestTest />} />
        {/* end */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
