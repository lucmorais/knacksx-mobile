import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../telas/Login";
import { TouchableHighlight, Text } from "react-native";
import styles from './styles';
import { useAuth } from "../contexts/auth";

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    const { formLogin, modificaFormLogin } = useAuth();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login}  options={{
                 headerRight: () => (
                    formLogin?  <TouchableHighlight
                                    onPress={() => {
                                        modificaFormLogin();
                                    }}
                                    style={styles.botaoCadastro}
                                    
                                >
                                    <Text style={styles.tituloCadastro}>Cadastre-se</Text>
                                </TouchableHighlight>:  <TouchableHighlight
                                                            onPress={() => {
                                                                modificaFormLogin();
                                                            }}
                                                            style={styles.botaoCadastro}
                                                            
                                                        >
                                                            <Text style={styles.tituloCadastro}>Já sou cadastrado</Text>
                                                        </TouchableHighlight>
                ),
                headerStyle: {
                    backgroundColor: 'white'
                },
                headerTitleStyle: {
                    color: 'black',
                },
                title: formLogin ? 'Login' : 'Cadastre-se'
            }}/>
        </AuthStack.Navigator>
    )
}