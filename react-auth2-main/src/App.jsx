import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Home from "./pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Auth/Dashboard";

export default function App() {
    const [isAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
                    <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
