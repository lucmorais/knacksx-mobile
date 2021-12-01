import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text, Platform, Button } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {signed, user, loading, logIn} = useAuth();

    function handleLogIn() {
        logIn(email, senha);
    }

    return (
        <View style={styles.conteudo}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View>
                    <TextInput placeholder="Email" style={styles.campo} onChangeText={(text) => setEmail(text)}></TextInput>
                    <TextInput placeholder="Senha" secureTextEntry={true} style={styles.campo} onChangeText={(text) => setSenha(text)}></TextInput>
                    <Button title="Login" onPress={handleLogIn} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}