import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { http } from '../../utils/http';
import styles from './styles';

interface Dados {
    nome: string | null;
    email: string | null;
    id: number;
    reset_senha: string;
    telefone: string;
    senha: string;
    tipo: string;
}

export default function Home() {
    const {user} = useAuth();
    const [editar, setEditar] = useState(false);
    const [salvar, setSalvar] = useState(false);
    const [cancelar, setCancelar] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dados, setDados] = useState({} as Dados);

    useEffect(() => {
        buscaPerfil();
    }, []);

    async function buscaPerfil() {
        const { data } = await http.get(`/usuarios/${user?.id}`);
       
        setNome(data.nome);
        setEmail(data.email);
    }

    async function atualizarUsuario() {
        const { data } = await http.put(`/usuarios/${user?.id}`, { nome, email });

        setDados(data);
    }

    return (
        <>
            <Text style={styles.titulo}>Perfil</Text>
            <View style={styles.conteudo}>
                <View>
                    <TextInput
                        editable={editar} 
                        selectTextOnFocus={editar} 
                        style={styles.campo} 
                        defaultValue={dados.nome ? dados.nome : nome}
                        onChangeText={(texto) => {
                            if (texto != nome) {
                                setSalvar(true);
                                setNome(texto);
                            }
                        }}
                    ></TextInput>
                    <TextInput 
                        editable={editar} 
                        selectTextOnFocus={editar} 
                        style={styles.campo} 
                        defaultValue={dados.email ? dados.email : email}
                        keyboardType="email-address"
                        onChangeText={(texto) => {
                            if(texto != email) {
                                setSalvar(true);
                                setEmail(texto);
                            }
                        }}
                    ></TextInput>
                    <View style={styles.botaoEditar}>
                        {!cancelar && 
                            <Button 
                                title="Editar perfil" 
                                color="green" 
                                onPress={() => {
                                setEditar(true);
                                setCancelar(true);
                            }}
                            />
                        }
                    </View>
                    <View style={styles.botaoEditar}>
                        {cancelar && 
                            <Button
                                title="Cancelar" 
                                onPress={() => {
                                    buscaPerfil();
                                    setEditar(false);
                                    setSalvar(false);
                                    setCancelar(false);
                                }}
                                color="red"
                            />
                        }
                    </View>
                    <View style={styles.botaoEditar}>
                        {salvar && 
                            <Button title="Salvar alterações" onPress={() => {
                                atualizarUsuario();
                                setEditar(false);
                                alert('Perfil atualizado!');
                                setSalvar(false);
                                setCancelar(false);
                                buscaPerfil();   
                            }}
                            />
                        }
                    </View>
                </View>
            </View>
        </>
    )
}