import React from "react";
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from "../contexts/auth";
import styles from "./styles";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Routes() {
    const {signed, loading} = useAuth();

    if (loading) {
        return (
            <View style={styles.conteudo}>
                <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
            </View>
        )
    }

    return (
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}