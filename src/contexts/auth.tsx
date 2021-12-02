import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import { http } from "../utils/http";

interface User {
    username: string;
    id: number;
    email: string;
    role: string;
}

interface AuthContextProps {
    signed: boolean;
    user: User | null;
    loading: boolean;
    logIn(email: string, senha: string): Promise<void>;
    logOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@Wise:user');
            const storagedToken = await AsyncStorage.getItem('@Wise:token');
            
            if (storagedUser && storagedToken) {
                http.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }
        }

        loadStoragedData();
    }, []);

    async function logIn(email: string, senha: string) {
        setLoading(true);
        const { data } = await auth.default(email, senha);
        
        if (data) {
            setLoading(false);
            setUser(data.user);
            http.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            await AsyncStorage.setItem('@Wise:user', JSON.stringify(data.user));
            await AsyncStorage.setItem('@Wise:token', data.access_token);
        }
    }

    async function logOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}