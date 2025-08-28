import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios"

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_API_URL })

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/api/auth/me", { withCredentials: true });
                console.log(res.data)
                setUser(res.data);
                setIsLogin(true)
            } catch (err) {
                setUser(null); // not logged in
                setIsLogin(false);
            }
        };

        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, isLogin, setUser, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuth = () => useContext(AuthContext)

