import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text, TouchableHighlight, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../contexts/auth';
import styles from './styles';

export default function Cadastro() {
    const { modificaFormLogin, registerIn } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const [cont, setCont] = useState(1);
    const [habilita, setHabilita] = useState(true);

    useEffect(() => {
        if(cont == 1) {
            if (nome.length < 3) {
                
                setHabilita(true)
            } else {
                setHabilita(false)
            }
        }
    },[nome, email, telefone, tipo, senha])
    
    function handleRegisterIn() {
        registerIn(nome, tipo, email, telefone, senha);

        next();
        setEmail('');
        setNome('');
        setSenha('');
        setTelefone('');
        setTipo('');
    }

    function validaCampo(text: string) {
        if(cont == 1) {
            if (text.length < 3) {
                
                setHabilita(true);
            } else {
                setHabilita(false);
            }
        }
        if(cont == 2) {
            if (text.length < 10) {
                
                setHabilita(true);
            } else {
                setHabilita(false);
            }
        }
        if(cont == 3) {
            if (text.length < 10 || text.length > 11) {
                
                setHabilita(true);
            } else {
                setHabilita(false);
            }
        }
        if(cont == 4) {
            if (text == 'Candidato' || text == 'Gestor') {
                setHabilita(false);
            } else {
                setHabilita(true);
            }
        }
        if(cont == 5) {
            if (text.length < 6) {
                
                setHabilita(true);
            } else {
                setHabilita(false);
            }
        }
    }
    

    function next() {
        setCont(cont+1);
    }

    function previus() {
        setCont(cont-1);
    }

    return (
        <View>
            {cont == 1&&<View>
                            <Text style={styles.tituloInput}>Insira o nome</Text>
                            <TextInput
                                value={nome}
                                style={styles.campoCadastro}
                                onChangeText={(text) => {
                                    setNome(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 2&&<View>
                            <Text style={styles.tituloInput}>Insira o email</Text>
                            <TextInput
                                value={email} 
                                keyboardType="email-address" 
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setEmail(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 3&&<View>
                            <Text style={styles.tituloInput}>Insira o telefone</Text>
                            <TextInput
                                value={telefone} 
                                keyboardType="phone-pad" 
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setTelefone(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 4&&<View>
                            <Text style={styles.tituloInput}>Insira o tipo de usuário</Text>
                            <TextInput
                                value={tipo} 
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setTipo(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 5&&<View>
                            <Text style={styles.tituloInput}>Insira a senha</Text>
                            <TextInput
                                value={senha} 
                                secureTextEntry={true} 
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setSenha(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont>=1&&cont<=4&& <>
                                    <TouchableHighlight
                                        disabled={habilita}
                                        underlayColor="white"
                                        style={habilita ? [styles.botaoEntrarDesabilitado] : [styles.botaoEntrarHabilitado]} 
                                        onPress={() => {
                                            next();
                                            setHabilita(true);
                                        }}
                                    >
                                        <Text style={styles.tituloEntrar}>Avançar</Text>
                                    </TouchableHighlight>
                                </>
            }
            {cont == 5 && <TouchableHighlight
                            disabled={habilita}
                            underlayColor="white" 
                            style={habilita ? [styles.botaoEntrarDesabilitado] : [styles.botaoEntrarHabilitado]}
                            onPress={() => handleRegisterIn()}
                        >
                            <Text style={styles.tituloEntrar}>Finalizar cadastro</Text>
                        </TouchableHighlight>

            }
            {cont == 6&&<View style={styles.caixaAlerta}>
                            <Icon name="check" color="#229A00" size={50}/>
                            <Text style={styles.alertaCadastro}>Cadastro efetuado com sucesso</Text>
                            <Text style={styles.avisoCadastro}>Você será redirecionado(a) para a tela de Login...</Text>
                        </View>
            }
        </View>
    )
}