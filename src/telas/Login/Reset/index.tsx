import React, { useState } from 'react';
import { TextInput, TouchableHighlight, Text, View, ActivityIndicator, Animated, Keyboard } from 'react-native';
import isEmail from 'validator/lib/isEmail';
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
    const [habilitaEmail, setHabilitaEmail] = useState(false);
    const [habilitaCodigo, setHabilitaCodigo] = useState(false);
    const [habilitaSenha, setHabilitaSenha] = useState(false);
    const [estadoEmail, setEstadoEmail]  = useState(true);
    const [estadoCodigo, setEstadoCodigo]  = useState(true);
    const [estadoSenha, setEstadoSenha]  = useState(true);
    const [redSquareAnim] = useState(new Animated.Value(0));

    function validaCodigo(text: string) {
        if (text.length < 8) {
            setEstadoCodigo(false);
            setHabilitaCodigo(false);
        }
        else {
            setHabilitaCodigo(true);
        }
    }

    function validaSenha(text: string) {
        if (text.length < 5) {
            setEstadoSenha(false);
            setHabilitaSenha(false);
        }
        else {
            setHabilitaSenha(true);
        }
    }

    function validaEmail(text: string) {
        if (!isEmail(text)) {
            setEstadoEmail(false);
            setHabilitaEmail(false);
        }
        else {
            setHabilitaEmail(true);
        }
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
            Animated.timing(redSquareAnim, {toValue: 220, duration: 500, useNativeDriver: true}).start();
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
                        {retorno && !carrega && <Alerta tipo={'times'} cor={'#FF0800'} mensagem={'Email não localizado'}/>}
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
                    placeholderTextColor="#808080"
                    style={habilitaEmail || estadoEmail ? [styles.campo] : [styles.campoCadastroErrado]}
                    onChangeText={(text) => {
                        setEmail(text);
                        validaEmail(text);
                    }}
                />
                <View style={styles.caixaBotoes}>
                    <TouchableHighlight
                        disabled={habilitaEmail ? false : true}
                        underlayColor="#E9E3CE" 
                        style={habilitaEmail ? [styles.botaoReset] : [styles.botaoResetDesabilitado]} 
                        onPress={() => {
                            Keyboard.dismiss();
                            enviaEmail();
                        }}
                    >
                        <Text style={styles.textoReset}>Enviar código</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#808080" 
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
                            {retorno && !carrega && <Alerta tipo={'times'} cor={'#FF0800'} mensagem={'Código invalido'}/>}
                        </View>
                    </Animated.View>
                    {carrega && 
                        <View style={styles.conteudo}>
                            <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
                        </View>
                    }
                    {sucesso ? 
                        <>
                                <Text style={styles.tituloReset}>Insira o código enviado para o email e a nova senha</Text>
                                <TextInput 
                                    placeholder="Código"
                                    maxLength={8}
                                    placeholderTextColor="#808080"
                                    style={habilitaCodigo || estadoCodigo ? [styles.campo] : [styles.campoCadastroErrado]}
                                    onChangeText={(text) => {
                                        setCodigo(text);
                                        validaCodigo(text);
                                    }}
                                />
                                <TextInput
                                    placeholder="Nova senha"
                                    placeholderTextColor="#808080"
                                    maxLength={8}
                                    secureTextEntry={true}
                                    style={habilitaSenha || estadoSenha ? [styles.campo] : [styles.campoCadastroErrado]}
                                    onChangeText={(text) => {
                                        setSenha(text);
                                        validaSenha(text);
                                    }}
                                />
                                <TouchableHighlight
                                    disabled={habilitaCodigo && habilitaSenha ? false : true}
                                    underlayColor="#E9E3CE"
                                    style={habilitaCodigo && habilitaSenha ? [styles.botaoReset] : [styles.botaoResetDesabilitado]} 
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
                                    cor={'#229A00'}
                                    mensagem={'Senha alterada com sucesso! Você será redirecionado(a) para a tela de login...'}
                                />
                            </View>}
                </>
        }
        </>
    )
}