import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../telas/Home";
import { Button, View } from "react-native";
import styles from "./styles";
import { useAuth } from "../contexts/auth";

const AppStack = createStackNavigator();

export default function AppRoutes() {
    const { logOut } = useAuth();

    const handleLogOut = () => logOut();

    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={Home} options={{
                headerRight: () => (
                    <View style={styles.botaoLogout}>
                        <Button
                            onPress={() => {
                                handleLogOut();
                                alert('Login feito com sucesso!');
                            }}
                            title="Logout"
                            color="blue"
                        />
                    </View>
                  ),
            }} />
        </AppStack.Navigator>
    )
}