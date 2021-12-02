import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function ListaHabilidade({titulo, nivel, descricao}: any) {
    return (
        <>
            <View>
                <View style={styles.caixa}>
                    <View >
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>
                    <View >
                        <Text style={styles.nivel}>{nivel}</Text>
                    </View>
                </View>
                <Text style={styles.descricao}>{descricao}</Text>
            </View>
            <View style={styles.divisor}/>
        </>
    )
}