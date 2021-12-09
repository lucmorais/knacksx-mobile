import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Alerta({tipo, mensagem, cor}: any) {
    return (
        <View style={styles.caixaAlerta}>
            <Icon name={tipo} color={cor} size={50}/>
            <Text style={styles.alertaCadastro}>{mensagem}</Text>
        </View>
    )
}