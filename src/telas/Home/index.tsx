import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput, ScrollView, FlatList, TouchableHighlight } from 'react-native';
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
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [dados, setDados] = useState({} as Dados);
    const [habilidade, setHabilidade] = useState('');
    const [consulta, setConsulta] = useState<object[]>([]);
    const [lista, setLista] = useState(true);

    useEffect(() => {
        buscaPerfil();
        return () => {
            setTelefone('');
            setEmail('');
            setHabilidade('');
            setDados({} as any);
            setConsulta([]);
        }
    }, []);

    async function buscaPerfil() {
        const { data } = await http.get(`/usuarios/${user?.id}`);
       
        setTelefone(data.telefone);
        setEmail(data.email);
    }

    async function atualizarUsuario() {
        const { data } = await http.put(`/usuarios/${user?.id}`, { telefone, email });

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
                            defaultValue={dados.email ? dados.email : email}
                            keyboardType="email-address"
                            onChangeText={(texto) => {
                                if(texto != email) {
                                    setSalvar(true);
                                    setEmail(texto);
                                }
                            }}
                        ></TextInput>
                        <TextInput
                            keyboardType="number-pad"
                            editable={editar} 
                            selectTextOnFocus={editar} 
                            style={styles.campo} 
                            defaultValue={dados.telefone ? dados.telefone : telefone}
                            onChangeText={(texto) => {
                                if (texto != telefone) {
                                    setSalvar(true);
                                    setTelefone(texto);
                                }
                            }}
                        ></TextInput>
                        <TouchableHighlight
                            disabled={!cancelar ? false : true}
                            underlayColor="#E9E3CE" 
                            style={!cancelar ? [styles.botaoEditar] : [styles.botaoEditarDesabilitado]} 
                            onPress={() => {
                                setEditar(true);
                                setCancelar(true);
                            }}
                        >
                            <Text style={styles.textoEditar}>Editar</Text>
                        </TouchableHighlight>
                        <View style={styles.botaoSalvar}>
                            <TouchableHighlight
                                disabled={salvar ? false : true}
                                underlayColor="#E9E3CE" 
                                style={salvar ? [styles.botaoAlterar] : [styles.botaoAlterarDesabilitado]} 
                                onPress={() => {
                                    atualizarUsuario();
                                    setEditar(false);
                                    alert('Perfil atualizado!');
                                    setSalvar(false);
                                    setCancelar(false);
                                    buscaPerfil();   
                                }}
                            >
                                <Text style={styles.textoEditar}>Salvar alterações</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                disabled={cancelar ? false : true}
                                underlayColor="#E9E3CE" 
                                style={cancelar ? [styles.botaoCancelar] : [styles.botaoCancelarDesabilitado]} 
                                onPress={() => {
                                    buscaPerfil();
                                    setEditar(false);
                                    setSalvar(false);
                                    setCancelar(false);  
                                }}
                            >
                                <Text style={styles.textoEditar}>Cancelar</Text>
                            </TouchableHighlight>
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
                                    placeholder="Digite a habilidade"
                                    placeholderTextColor="#808080"
                                    onChangeText={(texto) => {
                                        setHabilidade(texto);
                                    }}
                                    style={styles.campo}
                                />
                                <TouchableHighlight
                                    underlayColor="white" 
                                    style={styles.botaoBuscar} 
                                    onPress={() => {
                                        filtroHabilidade();
                                    }}
                                >
                                    <Text style={styles.textoBuscar}>Buscar</Text>
                                </TouchableHighlight>
                            </View>
                            
                        </ScrollView>
                    </>:<View style={{flex:1}}>
                            <Text style={styles.tituloResultado}>Habilidade: {habilidade}</Text>
                            <Text style={styles.resultado}>Resultado da pesquisa: {consulta.length}</Text>
                            <FlatList style={{marginVertical: 10}} renderItem={({item}) => <ListaGestor {...item}/>} data={consulta} />
                            <TouchableHighlight
                                underlayColor="#808080"
                                style={styles.botaoVoltar} 
                                onPress={() => {
                                    setHabilidade('');
                                    setLista(true);
                                    setConsulta([]);
                                }}
                            >
                                <Text style={styles.textoVoltar}>Buscar candidatos</Text>
                            </TouchableHighlight>
                        </View> }
        </>
    )

}