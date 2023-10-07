import "../src/assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LogoutPage from "./pages/Auth/LogoutPage";
import Test from "./components/Test/Test";
import FriendRequestTest from "./components/Test/FriendRequestTest";
import HomePage from "./pages/Home/HomePage";
import ConversationHome from "./pages/Conversation/ConversationHome";
import ContactHome from "./pages/Contact/ContactHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* feature */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactHome />} />
        <Route path="/conversation" element={<ConversationHome />} />
        <Route
          path="/conversation/:conversationId"
          element={<ConversationHome />}
        />
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
