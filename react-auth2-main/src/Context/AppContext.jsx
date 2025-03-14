import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider( { children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [setIsNewlyRegistered] = useState(false);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, setIsNewlyRegistered}}>
            {children}
        </AppContext.Provider>
    );
}