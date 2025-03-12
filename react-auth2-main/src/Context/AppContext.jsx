import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider( { children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [user, setUser] = useState(null);
    const [isNewlyRegistered, setIsNewlyRegistered] = useState(false);

    async function getUser() {
        const res = await fetch("http://127.0.0.1:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if(res.ok && !isNewlyRegistered) {
            setUser(data);
        }
       
    }

    useEffect(() => {
        if (token && window.location.pathname !== "/register") {
            getUser();
        }
    }, [token])

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, setIsNewlyRegistered}}>
            {children}
        </AppContext.Provider>
    );
}