import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //since we resetting redux states on logout, we need to store email and password in localstorage
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    const [authData, setAuthData] = useState({
        email: rememberedEmail,
        password: rememberedPassword,
        rememberMe: false,
    });

    const loginHandleContext = () => {
        setAuthData((prevAuthData) => ({
            ...prevAuthData,
            rememberMe: authData.rememberMe,
        }));

        if (authData.rememberMe) {
            localStorage.setItem('rememberedEmail', authData.email);
            localStorage.setItem('rememberedPassword', authData.password);
        }
    };

    return (
        <AuthContext.Provider value={{
            authData,
            setAuthData,
            loginHandleContext,
        }}> {children} </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);