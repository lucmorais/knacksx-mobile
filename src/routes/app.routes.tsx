import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../telas/Home";
import { Button, View } from "react-native";
import styles from "./styles";
import { useAuth } from "../contexts/auth";
import Habilidades from "../telas/Habilidades";
import Experiencias from "../telas/Experiencias";
import FormContext, { FormProvider } from "../contexts/form";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    const { user, logOut } = useAuth();
    const { modificaEstadoExperiencia, modificaEstadoHabilidade } = useContext(FormContext);
    const [botaoVisualizarHabilidade, setBotaoVisualizarHabilidade] = useState(true);
    const [botaoVisualizarExperiencia, setBotaoVisualizarExperiencia] = useState(true);

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
            <Tab.Screen name="Habilidades" component={Habilidades} options={{
                headerRight: () => (
                    botaoVisualizarHabilidade ?<Button 
                                        title="Visualizar habilidades"
                                        color="green" 
                                        onPress={() => {
                                            setBotaoVisualizarHabilidade(false);
                                            modificaEstadoHabilidade();
                                        }}
                                    /> :<Button 
                                            title="Adicionar habilidades"
                                            color="green" 
                                            onPress={() => {
                                                setBotaoVisualizarHabilidade(true);
                                                modificaEstadoHabilidade();
                                            }}
                                        />
                )
            }} />
            <Tab.Screen name="Experiencias" component={Experiencias} options={{
                headerRight: () => (
                    botaoVisualizarExperiencia ?<Button 
                                        title="Visualizar experiencias"
                                        color="green" 
                                        onPress={() => {
                                            setBotaoVisualizarExperiencia(false);
                                            modificaEstadoExperiencia();
                                        }}
                                    /> :<Button 
                                            title="Adicionar experiencias"
                                            color="green" 
                                            onPress={() => {
                                                setBotaoVisualizarExperiencia(true);
                                                modificaEstadoExperiencia();
                                            }}
                                        />
                )
            }} />
        </Tab.Navigator>
    )
}