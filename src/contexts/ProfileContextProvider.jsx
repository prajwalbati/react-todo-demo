import React, { useState } from "react";
import ProfileContext from "./ProfileContext";

const ProfileContextProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    return (
        <ProfileContext.Provider value={{profile, setProfile}}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;