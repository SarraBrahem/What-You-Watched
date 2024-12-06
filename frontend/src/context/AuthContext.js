import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToken, removeToken, getToken, getUserDetails } from '../Services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);  // Initialisation du token

    useEffect(() => {
        const loadAuthData = async () => {
            const savedToken = getToken();
            if (savedToken) {
                const userDetails = await getUserDetails(savedToken);
                if (userDetails) {
                    setUser(userDetails);
                    setIsAuthenticated(true);
                    setToken(savedToken);  // Assurer que le token est mis à jour dans le contexte
                }
            }
        };

        loadAuthData();
    }, []);

    const login = (newToken) => {
        saveToken(newToken);
        setToken(newToken);  // Mettre à jour le token dans le state
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setToken(null);  // Réinitialiser le token
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
