import React from "react";
import { BrowserRouter } from "react-router-dom";
import SmoothScroll from "./components/animations/SmoothScroll";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <SmoothScroll />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
