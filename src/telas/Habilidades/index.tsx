import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, TextInput, Platform, Button, FlatList, Text, ActivityIndicator, SafeAreaView, TouchableHighlight } from "react-native";
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
        setTitulo('');
        setNivel('');
        setDescricao('');

        return () => {
            setDados([]);
        }
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
                                    placeholderTextColor="#808080"
                                    maxLength={20}
                                    placeholder="Titulo"
                                    onChangeText={(texto) => setTitulo(texto)}
                                    value={titulo}
                                >
                                </TextInput>
                                <TextInput 
                                    style={styles.campo} 
                                    placeholder="Descrição"
                                    placeholderTextColor="#808080"
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(texto) => setDescricao(texto)}
                                    value={descricao}
                                >
                                </TextInput>
                                <Picker
                                    style={styles.campo}
                                    selectedValue={nivel}
                                    onValueChange={(itemValue: string, itemIndex) => {
                                        setNivel(itemValue);
                                    }}>
                                    {!nivel && <Picker.Item style={{color: '#808080'}} enabled={false} label="Selecione o nível" />}
                                    <Picker.Item label="Básico" value="Básico" />
                                    <Picker.Item label="Intermediário" value="Intermediário" />
                                    <Picker.Item label="Avançado" value="Avançado" />
                                </Picker>
                                <TouchableHighlight
                                    disabled={titulo && nivel && descricao ? false : true}
                                    underlayColor="#E9E3CE" 
                                    style={titulo && nivel && descricao ? [styles.botao] : [styles.botaoDesabilitado]} 
                                    onPress={() => {
                                        setLoading(true);
                                        inserirHabilidade();
                                        limparForm(); 
                                    }}
                                >
                                    <Text style={styles.textoAdicionar}>Adicionar habilidade</Text>
                                </TouchableHighlight>
                                {loading && <ActivityIndicator size="large" color="#fff"></ActivityIndicator>}
                            </View>
                        </KeyboardAvoidingView> : <FlatList renderItem={({item}) => <ListaHabilidade {...item}/>} data={dados} />}
            </View>
        </>
    )
}