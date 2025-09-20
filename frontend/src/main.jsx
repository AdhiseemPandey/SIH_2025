import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./Components/posts.jsx";
import Instruct from "./Components/instructions.jsx";
import RegisterPage from "./Components/register.jsx";
import Hero from "./Components/hero.jsx";
import LoginCard from "./Components/LoginCard.jsx";
//fghf
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginCard />
    {/* <HomePage /> */}
    {/* <Instruct /> */}
    {/* <RegisterPage /> */}
  </StrictMode>
);
