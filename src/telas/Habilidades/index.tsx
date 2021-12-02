import React, { useContext, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, TextInput, Platform, Button, FlatList, Text } from "react-native";
import { useAuth } from "../../contexts/auth";
import FormContext from "../../contexts/form";
import { http } from "../../utils/http";
import styles from "./styles";

interface Habilidade {
    descricao: string;
    id: number;
    titulo: string;
    nivel: string;
    usuarios: object;
}

export default function Habilidades() {
    const {user} = useAuth();
    const {formHab} = useContext(FormContext);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nivel, setNivel] = useState('');
    const [dados, setDados] = useState<Habilidade[]>([]);

    useEffect(() => {
        carregaHabilidades();
    }, [formHab]);

    async function inserirHabilidade() {
        const {data} = await http.post(`habilidades/${user?.id}`, { titulo, descricao, nivel });
    }

    async function carregaHabilidades() {
        const {data} = await http.get(`/habilidades/all/${user?.id}`);

        console.log(data);
        setDados(data);
    }

    return (
        <View style={styles.conteudo}>
            {formHab ? <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <View>
                            <TextInput style={styles.campo} placeholder="Titulo"></TextInput>
                            <TextInput style={styles.campo} placeholder="Nível"></TextInput>
                            <TextInput 
                                style={styles.campo} 
                                placeholder="Descrição"
                                multiline={true}
                                numberOfLines={4}
                            >
                            </TextInput>
                            <View style={styles.botao}>
                                <Button title="Adicionar habilidade" onPress={inserirHabilidade} />
                            </View>
                        </View>
                    </KeyboardAvoidingView> : <FlatList renderItem={({item}) => <Text>{item.titulo}</Text>} data={dados} />}
        </View>
    )
}