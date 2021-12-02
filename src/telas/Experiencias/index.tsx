import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native"; 
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

    useEffect(() => {
        carregaExperiencias();
    }, [formExp]);

    async function inserirExperiencia() {
        const {data} = await http.post(`/experiencias/${user?.id}`, { empresa, area, atividades });
    }

    async function carregaExperiencias() {
        const {data} = await http.get(`/experiencias/all/${user?.id}`);

        console.log(data);
        setDados(data);
    }

    return (
        <View style={styles.conteudo}>
            {formExp?<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <View>
                            <TextInput 
                                style={styles.campo} 
                                placeholder="Empresa" 
                                onChangeText={(text) => setEmpresa(text)}
                            >
                            </TextInput>
                            <TextInput 
                                style={styles.campo} 
                                placeholder="Area/Cargo" 
                                onChangeText={(text) => setArea(text)}
                            >
                            </TextInput>
                            <TextInput 
                                style={styles.campo} 
                                placeholder="Atividades"
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => setAtividades(text)}
                            >
                            </TextInput>
                            <View style={styles.botao}>
                                <Button title="Adicionar experiencia" onPress={() => inserirExperiencia()} />
                            </View>
                        </View>
                    </KeyboardAvoidingView> : <FlatList renderItem={({item}) => <ListaExperiencia {...item}/>} data={dados} />}
        </View>
    )
}