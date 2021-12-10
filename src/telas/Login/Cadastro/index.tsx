import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../contexts/auth';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import isEmail from 'validator/lib/isEmail';
import Alerta from '../../../components/Alerta';

 
export default function Cadastro() {
    const { registerIn, error } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cont, setCont] = useState(1);
    const [habilita, setHabilita] = useState<boolean | any>(true);
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState(false);
    
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
            if (text.length == 0) {
                setEstado(true);
                setHabilita(true);
            } else {
                setEstado(false);
                setHabilita(false);
            }
        }
        if(cont == 2) {
            
            if (!isEmail(text)) {
                setEstado(true);
                setHabilita(true);
            } else {
                setEstado(false);
                setHabilita(false);
            }
        }
        if(cont == 3) {
            if (text.length < 10) {
                setEstado(true);
                setHabilita(true);
            } else {
                setEstado(false);
                setHabilita(false);
            }
        }
        if(cont == 4) {
            if (text != '') {
                setHabilita(false);
            } else {
                setHabilita(true);
            }
        }
        if(cont == 5) {
            if (text.length < 5) {
                setEstado(true);
                setHabilita(true);
            } else {
                setEstado(false);
                setHabilita(false);
            }
        }
    }
    

    function next() {
        setCont(cont+1);
    }
    
    return (
        <View>
            {cont != 6 &&<Text style={styles.tituloCadastro}>Cadastre-se</Text>}
            {cont == 1&&<View>
                            <TextInput
                                value={nome}
                                placeholder="Nome"
                                placeholderTextColor="#808080"
                                style={!estado ? [styles.campoCadastro] : [styles.campoCadastroErrado]}
                                onChangeText={(text) => {
                                    setNome(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 2&&<View>
                            <TextInput
                                value={email} 
                                keyboardType="email-address"
                                placeholder="Email"
                                placeholderTextColor="#808080"
                                style={!estado ? [styles.campoCadastro] : [styles.campoCadastroErrado]} 
                                onChangeText={(text) => {
                                    setEmail(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 3&&<View>
                            <TextInput
                                value={telefone} 
                                keyboardType="phone-pad"
                                placeholder="Telefone"
                                placeholderTextColor="#808080"
                                style={!estado ? [styles.campoCadastro] : [styles.campoCadastroErrado]}
                                maxLength={11}
                                onChangeText={(text) => {
                                    setTelefone(text);
                                    validaCampo(text);
                                }}
                            />
                        </View>
            }
            {cont == 4&&<View>
                            <Picker
                                style={styles.campoCadastro}
                                selectedValue={tipo}
                                onValueChange={(itemValue: string, itemIndex) => {
                                    setTipo(itemValue);
                                    validaCampo(itemValue);
                                }}>
                                {!tipo && <Picker.Item style={{color: '#808080'}} enabled={false} label="Selecione o tipo" />}
                                <Picker.Item label="Candidato" value="Candidato" />
                                <Picker.Item label="Gestor" value="Gestor" />
                            </Picker>
                        </View>
            }
            {cont == 5&&<View>
                            <TextInput
                                value={senha}
                                maxLength={8}
                                placeholder="Senha"
                                placeholderTextColor="#808080"
                                secureTextEntry={true} 
                                style={!estado ? [styles.campoCadastro] : [styles.campoCadastroErrado]} 
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
            {cont == 6 && error &&
                <View style={styles.caixaAlerta}>
                        <Alerta 
                            tipo={'check'} 
                            cor={'#229A00'} 
                            mensagem={'Cadastro efetuado com sucesso! Você será redirecionado(a) para a tela inicial...'}
                        /> 
                </View>
            }
        </View>
    )
}