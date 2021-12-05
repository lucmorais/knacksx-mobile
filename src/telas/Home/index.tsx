import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput, ScrollView, FlatList } from 'react-native';
import ListaGestor from '../../components/ListaGestor';
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
    const [habilidade, setHabilidade] = useState('');
    const [consulta, setConsulta] = useState<object[]>([]);
    const [foco, setFoco] = useState(false);
    const [lista, setLista] = useState(true);

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

    async function filtroHabilidade() {
        const {data} = await http.post('/usuarios/habilidades/all', { habilidade });
        
        setConsulta(data);
        setLista(false);
    }

    if (user?.role == 'Candidato') {
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
    
    return (
        <>
            {lista ?<>
                        <Text style={styles.titulo}>Buscar candidatos</Text>
                        <ScrollView style={{flex:1}} keyboardShouldPersistTaps='handled'>
                            <View style={styles.containerGestor}>
                                <TextInput
                                    onFocus={() => setFoco(true)}
                                    onChangeText={(texto) => {
                                        setHabilidade(texto);
                                    }}
                                    style={foco ? [styles.campo, styles.bordaCampo] : [styles.campo]}
                                />
                            </View>
                            <View style={styles.containerGestor}>
                                <Button title="Buscar" onPress={() => {
                                    filtroHabilidade();
                                    setHabilidade('');
                                }}/>
                            </View>
                        </ScrollView>
                    </>:<View>
                            <Button title="Voltar" onPress={() => {
                                setLista(true);
                                setConsulta([]);
                            }}/>
                            <FlatList renderItem={({item}) => <ListaGestor {...item}/>} data={consulta} />    
                        </View> }
        </>
    )

}