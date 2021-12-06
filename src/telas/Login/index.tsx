import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text, Platform, Button, TouchableHighlight, Touchable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/auth';
import registerIn from '../../services/register';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const {signed, user, wrong, modificaWrong, loading, formLogin, logIn} = useAuth();
    
    useEffect(() => {
        setEmail('');
        setSenha('');

        if(nome)
            setNome('');
        
        if(telefone)
            setTelefone('');

        if (tipo)
            setTipo('');
    }, [formLogin])

    function handleLogIn() {
        logIn(email, senha);

        setEmail('');
        setNome('');
    }

    function handleRegisterIn() {
        registerIn(nome, tipo, email, telefone, senha);
        
        setEmail('');
        setNome('');
        setSenha('');
        setTelefone('');
        setTipo('');
    }

    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#345D7E', '#F27281']} style={styles.linearGradient}>
            <View>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    {formLogin? <View>
                                    <TextInput 
                                        placeholder="Email" 
                                        keyboardType="email-address" 
                                        style={styles.campo} 
                                        onFocus={() => {
                                            if(wrong)
                                                modificaWrong();
                                        }}  
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    <TextInput placeholder="Senha" secureTextEntry={true} style={styles.campo} onChangeText={(text) => setSenha(text)}></TextInput>
                                    
                                    <TouchableHighlight disabled={email && senha ? false : true} underlayColor="white" style={email && senha ? [styles.botaoEntrarHabilitado] : [styles.botaoEntrarDesabilitado]} onPress={handleLogIn}>
                                        <Text style={styles.tituloEntrar}>Entrar</Text>
                                    </TouchableHighlight>
                                </View>:<View>
                                            <TextInput placeholder="Nome" value={nome} style={styles.campo} onChangeText={(text) => setNome(text)}></TextInput>
                                            <TextInput placeholder="Email" value={email} keyboardType="email-address" style={styles.campo} onChangeText={(text) => setEmail(text)}></TextInput>
                                            <TextInput placeholder="Telefone" value={telefone} keyboardType="phone-pad" style={styles.campo} onChangeText={(text) => setTelefone(text)}></TextInput>
                                            <TextInput placeholder="Tipo" value={tipo} style={styles.campo} onChangeText={(text) => setTipo(text)}></TextInput>
                                            <TextInput placeholder="Senha" value={senha} secureTextEntry={true} style={styles.campo} onChangeText={(text) => setSenha(text)}></TextInput>
                                            <TouchableHighlight underlayColor="white" style={styles.botaoEntrarHabilitado} onPress={handleRegisterIn}><Text style={styles.tituloEntrar}>Cadastrar</Text></TouchableHighlight>
                                        </View>}
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    )
}