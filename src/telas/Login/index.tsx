import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text, Platform, TouchableHighlight, SafeAreaView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import Cadastro from './Cadastro';
import Reset from './Reset';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { reset, formLogin, logIn, deny, modificaReset } = useAuth();
    
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
                                <Text style={styles.tituloLogin}>Fazer login</Text>
                                <TextInput 
                                    placeholder="Email" 
                                    keyboardType="email-address"
                                    placeholderTextColor="#808080"
                                    style={styles.campo}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <TextInput 
                                    placeholder="Senha"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={true} 
                                    style={styles.campo} 
                                    onChangeText={(text) => setSenha(text)} 
                                />
                                {deny && <Text>Email ou senha incorretos</Text>}
                                <TouchableHighlight 
                                    disabled={email && senha ? false : true} 
                                    underlayColor="#E9E3CE" 
                                    style={email && senha ? [styles.botaoEntrarHabilitado] : [styles.botaoEntrarDesabilitado]} 
                                    onPress={handleLogIn}
                                >
                                    <Text style={styles.tituloBotaoEntrar}>Entrar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="#808080" 
                                    style={styles.botaoReset} 
                                    onPress={() => {
                                        modificaReset();
                                        setEmail('');
                                        setSenha('');
                                    }}
                                >
                                    <Text style={styles.textoReset}>Esqueceu sua senha?</Text>
                                </TouchableHighlight>
                            </>:<Reset/>
                        }
                        </View> : <Cadastro/>}
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    )
}