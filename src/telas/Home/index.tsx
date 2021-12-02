import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function Home() {
    const {user} = useAuth();

    return (
        <View style={styles.conteudo}>
            <View>
                <Text>{user?.username}</Text>
            </View>
        </View>   
    )
}