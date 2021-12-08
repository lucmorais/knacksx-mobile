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
    },[nome])
    
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
            <Text style={styles.tituloCadastro}>Cadastro de usuário</Text>
            {cont == 1&&<View>
                            <TextInput
                                value={nome}
                                placeholder="Nome"
                                placeholderTextColor="#808080"
                                style={styles.campoCadastro}
                                onChangeText={(text) => {
                                    setNome(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 2&&<View>
                            <Text style={styles.tituloInput}>Email:</Text>
                            <TextInput
                                value={email} 
                                keyboardType="email-address"
                                placeholder="Email"
                                placeholderTextColor="#808080"
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setEmail(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 3&&<View>
                            <Text style={styles.tituloInput}>Telefone:</Text>
                            <TextInput
                                value={telefone} 
                                keyboardType="phone-pad"
                                placeholder="Telefone"
                                placeholderTextColor="#808080"
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setTelefone(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 4&&<View>
                            <Text style={styles.tituloInput}>Tipo de usuário:</Text>
                            <TextInput
                                value={tipo}
                                placeholder="Tipo de usuário"
                                placeholderTextColor="#808080"
                                style={styles.campoCadastro} 
                                onChangeText={(text) => {
                                    setTipo(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 5&&<View>
                            <Text style={styles.tituloInput}>Senha:</Text>
                            <TextInput
                                value={senha}
                                placeholder="Senha"
                                placeholderTextColor="#808080"
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
                                        <Text style={styles.tituloEntrar}>Avançar <Icon name="forward" color="white" size={22}/></Text>
                                    </TouchableHighlight>
                                </>
            }
            {cont == 5 && <TouchableHighlight
                            disabled={habilita}
                            underlayColor="white" 
                            style={habilita ? [styles.botaoEntrarDesabilitado] : [styles.botaoFinalizaHabilitado]}
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