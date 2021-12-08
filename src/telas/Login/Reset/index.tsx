import React, { useState } from 'react';
import { TextInput, TouchableHighlight, Text, View, ActivityIndicator, Animated, Keyboard } from 'react-native';
import Alerta from '../../../components/Alerta';
import { useAuth } from '../../../contexts/auth';
import { http } from '../../../utils/http';
import styles from './styles';

export default function Reset() {
    const { reset, modificaReset } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState(true);
    const [carrega, setCarrega] = useState(false);
    const [retorno, setRetorno] = useState(false);
    const [sucesso, setSucesso] = useState(true);
    const [redSquareAnim] = useState(new Animated.Value(0));

    function validaCodigo(codigo: string) {
        if (codigo.length != 8)
            return false
        else
            return true
    }

    async function enviaEmail() {
        setCarrega(true);
        const { data } = await http.post('/recuperar-senha', { email });
        
        setCarrega(false);
        
        if(data) {
            setNovaSenha(false);
        } else {
            setRetorno(true);
            Animated.timing(redSquareAnim, {toValue: 200, duration: 500, useNativeDriver: true}).start();
            setTimeout(() => {
                Animated.timing(redSquareAnim, {toValue: -200, duration: 500, useNativeDriver: true}).start();
            }, 5000);
            setNovaSenha(true);
        }
    }

    async function trocaSenha() {
        setCarrega(true);
        const { data } = await http.put('/usuarios', { codigo, senha });
        
        setCarrega(false);

        if(data) {
            setSucesso(false);
            if(!reset) {
                setTimeout(() => {
                    modificaReset();
                    setSucesso(true);
                }, 5000);
            }
        } else {
            setRetorno(true);
            Animated.timing(redSquareAnim, {toValue: 200, duration: 500, useNativeDriver: true}).start();
            setTimeout(() => {
                Animated.timing(redSquareAnim, {toValue: -200, duration: 500, useNativeDriver: true}).start();
            }, 5000);
        }
    }

    return (
        <>
        {novaSenha ?
            <>  
                <Animated.View style={{transform: [{translateY: redSquareAnim}]}}>
                    <View style={styles.retorno}>
                        {retorno && !carrega && <Alerta tipo={'times'} mensagem={'Email não localizado'}/>}
                    </View>
                </Animated.View>
                {carrega && 
                    <View style={styles.conteudo}>
                        <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
                    </View>
                }
                <Text style={styles.tituloReset}>Insira seu email cadastrado para recuperar a senha</Text>
                <TextInput 
                    placeholder="Digite seu email" 
                    keyboardType="email-address"
                    placeholderTextColor="#555555"
                    style={styles.campo}
                    onChangeText={(text) => setEmail(text)}
                />
                <View style={styles.caixaBotoes}>
                    <TouchableHighlight
                        underlayColor="black" 
                        style={styles.botaoReset} 
                        onPress={() => {
                            Keyboard.dismiss();
                            enviaEmail();
                        }}
                    >
                        <Text style={styles.textoReset}>Enviar código</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="black" 
                        style={styles.botaoResetCancelar} 
                        onPress={() => {
                            modificaReset();
                            if(!novaSenha)
                                setNovaSenha(true);
                        }}
                    >
                        <Text style={styles.textoResetCancelar}>Cancelar</Text>
                    </TouchableHighlight>
                </View>
            </>:<>
                    <Animated.View style={{transform: [{translateY: redSquareAnim}]}}>
                        <View style={styles.retorno}>
                            {retorno && !carrega && <Alerta tipo={'times'} mensagem={'Código invalido'}/>}
                        </View>
                    </Animated.View>
                    {carrega && 
                        <View style={styles.conteudo}>
                            <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
                        </View>
                    }
                    {sucesso ? 
                        <>
                                <Text style={styles.tituloReset}>Insira o código que enviamos para o seu email</Text>
                                <TextInput 
                                    placeholder="Código"
                                    placeholderTextColor="#555555"
                                    style={styles.campo}
                                    onChangeText={(text) => setCodigo(text)}
                                />
                                <TextInput
                                    placeholder="Nova senha"
                                    placeholderTextColor="#555555" 
                                    secureTextEntry={true} 
                                    style={styles.campo}
                                    onChangeText={(text) => setSenha(text)}
                                />
                                <TouchableHighlight
                                    disabled={validaCodigo(codigo) && senha ? false : true}
                                    underlayColor="black"
                                    style={validaCodigo(codigo) && senha ? [styles.botaoReset] : [styles.botaoResetDesabilitado]} 
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        trocaSenha();
                                    }}
                                >
                                    <Text style={styles.textoReset}>Confirmar</Text>
                                </TouchableHighlight>
                        </>: <View style={styles.sucesso}>
                                <Alerta 
                                    tipo={'check'} 
                                    mensagem={'Senha alterada com sucesso! Você será redirecionado(a) para a tela de login...'}
                                />
                            </View>}
                </>
        }
        </>
    )
}