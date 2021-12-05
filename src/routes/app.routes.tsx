import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text, TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";
import { useAuth } from "../contexts/auth";
import Home from "../telas/Home";
import Habilidades from "../telas/Habilidades";
import Experiencias from "../telas/Experiencias";
import FormContext, { FormProvider } from "../contexts/form";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AppRoutes() {
    const { user, logOut } = useAuth();
    const { modificaEstadoExperiencia, modificaEstadoHabilidade } = useContext(FormContext);
    const [botaoVisualizarHabilidade, setBotaoVisualizarHabilidade] = useState(true);
    const [botaoVisualizarExperiencia, setBotaoVisualizarExperiencia] = useState(true);

    const handleLogOut = () => logOut();

    if (user?.role == 'Candidato') {
        return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#345D7E',
                tabBarInactiveBackgroundColor: '#fff',
                tabBarActiveBackgroundColor: '#F27281',
                tabBarStyle: {
                    height: 75
                },
                tabBarLabelStyle: {
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: 16,
                    lineHeight: 21,
                    marginTop: 3,
                    paddingTop: 5
                },
                tabBarHideOnKeyboard: true,
            }}>  
                <Tab.Screen name="Home" component={Home} options={{
                    headerRight: () => (
                        <TouchableHighlight
                            onPress={() => {
                                handleLogOut();
                                alert('LogOut realizado!');
                            }}
                            style={styles.botaoLogout}
                        >
                            <Icon name="sign-out" color="#345D7E" size={30}/>
                        </TouchableHighlight>
                    ),
                    headerStyle: {
                        backgroundColor: '#345D7E'
                    },
                    headerTitleStyle: {
                        color: 'white',
                        display: 'none'
                    },
                    tabBarIcon: ({focused, color, size }) => (
                        <Icon name="home" size={28} color={focused ? 'white' : "#345D7E"}/>
                    ),
                    tabBarIconStyle: {
                        marginTop: 5
                    },
                    headerLeft: () => { 
                        return (
                            <Icon style={styles.icone} name="user" size={28} color='white'>
                                <Text style={styles.usuario}> {user?.username}</Text>
                            </Icon>
                        )
                    }
                }} />
                <Tab.Screen name="Habilidades" component={Habilidades} options={{
                    headerRight: () => (
                        <View style={styles.botao}>
                            {botaoVisualizarHabilidade ?<Button 
                                                    title="Visualizar habilidades"
                                                    color="#F27281" 
                                                    onPress={() => {
                                                        setBotaoVisualizarHabilidade(false);
                                                        modificaEstadoHabilidade();
                                                    }}
                                                /> :<Button 
                                                    title="Adicionar habilidades"
                                                    color="#F27281" 
                                                    onPress={() => {
                                                        setBotaoVisualizarHabilidade(true);
                                                        modificaEstadoHabilidade();
                                                    }}
                                                />}
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#345D7E'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    tabBarIcon: ({focused, color, size }) => (
                        <Icon name="cogs" size={28} color={focused ? 'white' : "#345D7E"}/>
                    ),
                    tabBarIconStyle: {
                        marginTop: 5
                    }
                }} />
                <Tab.Screen name="Experiencias" component={Experiencias} options={{
                    headerRight: () => (
                        <View style={styles.botao}>
                            {botaoVisualizarExperiencia ?<Button 
                                            title="Visualizar experiencias"
                                            color="#F27281" 
                                            onPress={() => {
                                                setBotaoVisualizarExperiencia(false);
                                                modificaEstadoExperiencia();
                                            }}
                                        /> :<Button 
                                                title="Adicionar experiencias"
                                                color="#F27281" 
                                                onPress={() => {
                                                    setBotaoVisualizarExperiencia(true);
                                                    modificaEstadoExperiencia();
                                                }}
                                            />}
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#345D7E'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    tabBarIcon: ({focused, color, size }) => (
                        <Icon name="laptop" size={28} color={focused ? 'white' : "#345D7E"}/>
                    ),
                    tabBarIconStyle: {
                        marginTop: 5
                    }
                }} />
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerRight: () => (
                    <TouchableHighlight
                        onPress={() => {
                            handleLogOut();
                            alert('LogOut realizado!');
                        }}
                        style={styles.botaoLogout}
                    >
                        <Icon name="sign-out" color="#345D7E" size={30}/>
                    </TouchableHighlight>
                ),
                headerLeft: () => { 
                    return (
                        <Icon style={styles.icone} name="user" size={28} color='white'>
                            <Text style={styles.usuario}> {user?.username}</Text>
                        </Icon>
                    )
                },
                headerStyle: {
                    backgroundColor: '#345D7E'
                },
                headerTitleStyle: {
                    color: 'white',
                    display: 'none'
                },
            }} />
        </Stack.Navigator>
    )
}