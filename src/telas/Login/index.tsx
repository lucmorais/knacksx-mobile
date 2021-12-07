import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text, Platform, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import Cadastro from './Cadastro';
import Reset from './Reset';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { reset, formLogin, logIn, modificaReset } = useAuth();
    
    useEffect(() => {
        setEmail('');
        setSenha('');
    }, [formLogin])

    function handleLogIn() {
        logIn(email, senha);

        setEmail('');
        setSenha('');
    }

    return (
        <LinearGradient 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 1}} 
            colors={['#345D7E', '#F27281']} 
            style={styles.linearGradient}
        >
            <View>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    {formLogin ?
                        <View>
                        {reset ? 
                            <>
                                <TextInput 
                                    placeholder="Email" 
                                    keyboardType="email-address" 
                                    style={styles.campo}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <TextInput 
                                    placeholder="Senha" 
                                    secureTextEntry={true} 
                                    style={styles.campo} 
                                    onChangeText={(text) => setSenha(text)} 
                                /> 
                                <TouchableHighlight 
                                    disabled={email && senha ? false : true} 
                                    underlayColor="white" 
                                    style={email && senha ? [styles.botaoEntrarHabilitado] : [styles.botaoEntrarDesabilitado]} 
                                    onPress={handleLogIn}
                                >
                                    <Text style={styles.tituloEntrar}>Entrar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="white" 
                                    style={styles.botaoReset} 
                                    onPress={() => modificaReset()}
                                >
                                    <Text style={styles.textoReset}>Esqueci minha senha</Text>
                                </TouchableHighlight>
                            </>:<Reset/>
                        }
                        </View> : <Cadastro/>}
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    )
}