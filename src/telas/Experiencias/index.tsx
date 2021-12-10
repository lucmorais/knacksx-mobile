import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableHighlight, View } from "react-native"; 
import ListaExperiencia from "../../components/ListaExperiencia";
import { useAuth } from "../../contexts/auth";
import FormContext from "../../contexts/form";
import { http } from "../../utils/http";
import styles from "./styles";

interface Experiencia {
    area: string;
    id: number;
    atividades: string;
    empresa: string;
    usuarios: object;
}

export default function Experiencias() {
    const {user} = useAuth();
    const {formExp} = useContext(FormContext);
    const [empresa, setEmpresa] = useState('');
    const [area, setArea] = useState('');
    const [atividades, setAtividades] = useState('');
    const [dados, setDados] = useState<Experiencia[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregaExperiencias();
        setEmpresa('');
        setArea('');
        setAtividades('');

        return () => {
            setDados([]);
        }
    }, [formExp]);

    function limparForm() {
        setEmpresa('');
        setArea('');
        setAtividades('');
    }

    async function inserirExperiencia() {
        const {data} = await http.post(`/experiencias/${user?.id}`, { empresa, area, atividades });
        
        if (data) {
            setLoading(false);
            alert('Experiencia adicionada');
        }
    }

    async function carregaExperiencias() {
        const {data} = await http.get(`/experiencias/all/${user?.id}`);

        setDados(data);
    }

    return (
        <>
            {formExp && <Text style={styles.titulo}>Adicionar experiência</Text>}
            <View style={styles.conteudo}>
                {formExp?<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View>
                                <TextInput 
                                    style={styles.campo}
                                    maxLength={20}
                                    placeholderTextColor="#808080"
                                    placeholder="Empresa" 
                                    onChangeText={(text) => setEmpresa(text)}
                                    value={empresa}
                                >
                                </TextInput>
                                <TextInput 
                                    style={styles.campo}
                                    placeholderTextColor="#808080"
                                    maxLength={30}
                                    placeholder="Area/Cargo" 
                                    onChangeText={(text) => setArea(text)}
                                    value={area}
                                >
                                </TextInput>
                                <TextInput 
                                    style={styles.campo} 
                                    placeholder="Atividades"
                                    placeholderTextColor="#808080"
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text) => setAtividades(text)}
                                    value={atividades}
                                >
                                </TextInput>
                                <TouchableHighlight
                                    disabled={empresa && area && atividades ? false : true}
                                    underlayColor="#E9E3CE" 
                                    style={empresa && area && atividades ? [styles.botao] : [styles.botaoDesabilitado]} 
                                    onPress={() => {
                                        setLoading(true);
                                        inserirExperiencia();
                                        limparForm();
                                    }}
                                >
                                    <Text style={styles.textoAdicionar}>Adicionar experiência</Text>
                                </TouchableHighlight>
                                {loading && <ActivityIndicator size="large" color="#000"></ActivityIndicator>}
                            </View>
                        </KeyboardAvoidingView> : <FlatList renderItem={({item}) => <ListaExperiencia {...item}/>} data={dados} />}
            </View>
        </>
    )
}