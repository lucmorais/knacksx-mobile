import React, { useContext, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, TextInput, Platform, Button, FlatList, Text, ActivityIndicator } from "react-native";
import ListaHabilidade from "../../components/ListaHabilidade";
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregaHabilidades();
    }, [formHab]);

    function limparForm() {
        setTitulo('');
        setNivel('');
        setDescricao('');
    }

    async function inserirHabilidade() {
        const {data} = await http.post(`habilidades/${user?.id}`, { titulo, descricao, nivel });
        
        if (data) {
            setLoading(false);
            alert('Habilidade adicionada');
        }
    }

    async function carregaHabilidades() {
        const {data} = await http.get(`/habilidades/all/${user?.id}`);

        setDados(data);
    }

    return (
        <>
            {formHab &&<Text style={styles.titulo}>Adicionar habilidade</Text>}
            <View style={styles.conteudo}>
                {formHab ? <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View>
                                <TextInput
                                    style={styles.campo} 
                                    placeholder="Titulo"
                                    onChangeText={(texto) => setTitulo(texto)}
                                    value={titulo}
                                >
                                </TextInput>
                                <TextInput 
                                    style={styles.campo} 
                                    placeholder="Nível"
                                    onChangeText={(texto) => setNivel(texto)}
                                    value={nivel}
                                >
                                </TextInput>
                                <TextInput 
                                    style={styles.campo} 
                                    placeholder="Descrição"
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(texto) => setDescricao(texto)}
                                    value={descricao}
                                >
                                </TextInput>
                                <View style={styles.botao}>
                                    <Button title="Adicionar habilidade" onPress={() => {
                                        setLoading(true);
                                        inserirHabilidade();
                                        limparForm();
                                    }}
                                    />
                                </View>
                                {loading && <ActivityIndicator size="large" color="#fff"></ActivityIndicator>}
                            </View>
                        </KeyboardAvoidingView> : <FlatList renderItem={({item}) => <ListaHabilidade {...item}/>} data={dados} />}
            </View>
        </>
    )
}