import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../telas/Home";
import { Button, View } from "react-native";
import styles from "./styles";
import { useAuth } from "../contexts/auth";
import Habilidades from "../telas/Habilidades";
import Experiencias from "../telas/Experiencias";

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    const { logOut } = useAuth();

    const handleLogOut = () => logOut();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                headerRight: () => (
                    <View style={styles.botaoLogout}>
                        <Button
                            onPress={() => {
                                handleLogOut();
                                alert('LogOut realizado!');
                            }}
                            title="Logout"
                            color="blue"
                        />
                    </View>
                  ),
            }} />
            <Tab.Screen name="Habilidades" component={Habilidades} />
            <Tab.Screen name="Experiencias" component={Experiencias} />
        </Tab.Navigator>
    )
}