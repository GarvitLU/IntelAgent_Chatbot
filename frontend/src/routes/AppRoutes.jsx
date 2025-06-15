import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import EmailVerificationPrompt from "../components/EmailVerificationPrompt/EmailVerificationPrompt";
import EmailVerificationSuccess from "../components/EmailVerificationSuccess/EmailVerificationSuccess";
import RoleSelection from "../components/RoleSelection/RoleSelection";
import ProfilePage from "../pages/Profile/ProfilePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/" element={<Home />} />
            <Route path="/verify-email" element={<EmailVerificationPrompt />} />
            <Route
                path="/email-verified"
                element={<EmailVerificationSuccess />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
