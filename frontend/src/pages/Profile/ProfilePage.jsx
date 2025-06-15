import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);

            // Validate required user data
            if (!parsedUser || !parsedUser.email || !parsedUser.firebaseUID) {
                console.error("Invalid user data:", parsedUser);
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            setUser(parsedUser);
        } catch (err) {
            console.error("Error parsing user data:", err);
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Profile user={user} />
        </div>
    );
};

export default ProfilePage;
