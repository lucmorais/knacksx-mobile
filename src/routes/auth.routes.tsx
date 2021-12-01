import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../telas/Login";

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    )
}