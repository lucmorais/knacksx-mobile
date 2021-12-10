import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, FlatList, View } from 'react-native';
import ListaGestor from '../../components/ListaGestor';
import FormContext from '../../contexts/form';
import { http } from '../../utils/http';
import styles from './styles';

export default function Lista() {
    const { listaGestor } = useContext(FormContext)
    const [buscaAll, setBuscaAll] = useState([]);
    const [buscaExperiancias, setBuscaExperiencias] = useState([]);
    
    useEffect(() => {
        listaGestor ? buscarTodos() : buscarExp();
        return () => {
            setBuscaAll([]);
            setBuscaExperiencias([]);
        } 
    }, [listaGestor]);

    async function buscarTodos() {
        const { data } = await http.get('/usuarios/todos');

        setBuscaAll(data);
        setBuscaExperiencias([]);
    }

    async function buscarExp() {
        const { data } = await http.get('/usuarios/habilidades/experiencias');

        setBuscaExperiencias(data);
        setBuscaAll([]);
    }

    return (
            listaGestor?<>
                            <Text style={styles.titulo}>Listagem de todos candidatos</Text>
                            <Text style={styles.resultado}>Resultado da pesquisa: {buscaAll.length}</Text>
                            <FlatList style={{marginTop: 10}} data={buscaAll} renderItem={({item}) => <ListaGestor {...item}/>} />
                        </>:<>
                                <Text style={styles.titulo}>Listagem candidatos com perfil completo</Text>
                                <Text style={styles.resultado}>Resultado da pesquisa: {buscaExperiancias.length}</Text>
                                <FlatList style={{marginTop: 10}} data={buscaExperiancias} renderItem={({item}) => <ListaGestor {...item}/>} />
                            </>
    )
}