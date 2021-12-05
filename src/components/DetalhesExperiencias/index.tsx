import React from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import styles from './styles';

export default function DetalhesExperiencias({empresa, area, atividades}: any) {
    return (
        <>
            <View>
                <View style={styles.caixa}>
                    <View >
                        <Text style={styles.empresa}>{empresa}</Text>
                    </View>
                    <View >
                        <Text style={styles.area}>{area}</Text>
                    </View>
                </View>
                <Text style={styles.atividades}>{atividades}</Text>
            </View>
            <View style={styles.divisor}/>
        </>
    )
}