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
    }, [listaGestor]);

    async function buscarTodos() {
        const { data } = await http.get('/usuarios/todos');

        setBuscaAll(data);
        setBuscaExperiencias([]);
        console.log(buscaExperiancias.length);
    }

    async function buscarExp() {
        const { data } = await http.get('/usuarios/habilidades/experiencias');

        setBuscaExperiencias(data);
        setBuscaAll([]);
        console.log(buscaAll.length);
    }

    return (
            listaGestor?<>
                            <Text style={styles.titulo}>Listagem de todos candidatos</Text>
                            <FlatList data={buscaAll} renderItem={({item}) => <ListaGestor {...item}/>} />
                        </>:<>
                                <Text style={styles.titulo}>Listagem candidatos com perfil completo</Text>
                                <FlatList data={buscaExperiancias} renderItem={({item}) => <ListaGestor {...item}/>} />
                            </>
    )
}