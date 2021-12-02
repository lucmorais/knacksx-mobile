import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { http } from '../../utils/http';
import styles from './styles';

export default function Home() {
    const {user} = useAuth();
    const [editar, setEditar] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        buscaPerfil();
    }, []);

    async function buscaPerfil() {
        const { data } = await http.get(`/usuarios/${user?.id}`);

        console.log(data);
        
        setNome(data.nome);
        setEmail(data.email);
    }

    async function atualizarUsuario() {
        const { data } = await http.put(`/usuarios/${user?.id}`, { nome, email });
    }

    return (
        <View style={styles.conteudo}>
            <View>
                <Text style={styles.texto}>Bem vindo(a) {nome}</Text>
            </View>
            <View>
                <TextInput
                    editable={editar} 
                    selectTextOnFocus={editar} 
                    style={styles.campo} 
                    defaultValue={nome}
                    onChangeText={(texto) => setNome(texto)}
                ></TextInput>
                <TextInput 
                    editable={editar} 
                    selectTextOnFocus={editar} 
                    style={styles.campo} 
                    defaultValue={email}
                    onChangeText={(texto) => setEmail(texto)}
                ></TextInput>
                <View style={styles.botaoEditar}>
                    <Button title="Editar" color="green" onPress={() => setEditar(true)}/>
                </View>
                <View style={styles.botaoEditar}>
                    <Button title="Salvar" color="blue" onPress={() => {
                        atualizarUsuario();
                        setEditar(false);
                        alert('Perfil atualizado!');
                    }}/>
                </View>
            </View>
        </View>
    )
}