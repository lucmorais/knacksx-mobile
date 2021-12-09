import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text, Platform, TouchableHighlight, SafeAreaView, Keyboard, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/auth';
import styles from './styles';
import Cadastro from './Cadastro';
import Reset from './Reset';
import Icon from 'react-native-vector-icons/FontAwesome';
import isEmail from 'validator/lib/isEmail';

export default function Login() {
    const { reset, formLogin, deny, logIn, modificaReset } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [habilitaEmail, setHabilitaEmail] = useState<boolean | any>(false);
    const [habilitaSenha, setHabilitaSenha] = useState<boolean | any>(false);

    useEffect(() => {
        setEmail('');
        setSenha('');
        setHabilitaEmail(false);
        setHabilitaSenha(false);
        
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
                                <View style={styles.deny}>
                                    {deny && <>
                                                <Icon name="times" color="#FF0800" size={16}/>
                                                <Text style={styles.textoDeny}>
                                                    Email ou senha incorretos.
                                                </Text>
                                            </>}
                                </View>
                                <TextInput 
                                    placeholder="Email" 
                                    keyboardType="email-address"
                                    placeholderTextColor="#808080"
                                    style={!habilitaEmail ? [styles.campo] : [styles.campoCadastroErrado]}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        !isEmail(text) ? setHabilitaEmail(true) : setHabilitaEmail(false);
                                    }}
                                />
                                <TextInput 
                                    placeholder="Senha"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={true}
                                    maxLength={8}
                                    style={!habilitaSenha ? [styles.campo] : [styles.campoCadastroErrado]} 
                                    onChangeText={(text) => {
                                        setSenha(text);
                                        text.length < 5 ? setHabilitaSenha(true) : setHabilitaSenha(false);
                                    }} 
                                />
                                <TouchableHighlight 
                                    disabled={!habilitaEmail && !habilitaSenha && senha ? false : true} 
                                    underlayColor="#E9E3CE" 
                                    style={!habilitaEmail && !habilitaSenha && senha ? [styles.botaoEntrarHabilitado] : [styles.botaoEntrarDesabilitado]} 
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