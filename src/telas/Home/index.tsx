import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function Home() {
    const {logOut} = useAuth();

    function handleLogOut() {
        logOut();
    }

    return (
        <View style={styles.conteudo}>
            <View> 
                <Button title="Logout" onPress={handleLogOut} />
            </View>
        </View>
    )
}