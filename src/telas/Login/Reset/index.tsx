import React, { useState } from 'react';
import { TextInput, TouchableHighlight, Text } from 'react-native';
import { useAuth } from '../../../contexts/auth';
import { http } from '../../../utils/http';
import styles from './styles';

export default function Reset() {
    const { modificaReset } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState(true);

    async function verificaEmail() {
        const { data } = await http.post('/recuperar-senha', { email });

        data ? setNovaSenha(false) : setNovaSenha(true);
    }

    async function trocaSenha() {
        const { data } = await http.put('/usuarios', { codigo, senha });
    }

    return (
        <>
        {novaSenha ?
            <>
                <TextInput 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    style={styles.campo}
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableHighlight
                    underlayColor="white" 
                    style={styles.botaoReset} 
                    onPress={() => verificaEmail()}
                >
                    <Text style={styles.textoReset}>Verificar email</Text>
                </TouchableHighlight>
            </>:<> 
                    <TextInput 
                        placeholder="Código"
                        style={styles.campo}
                        onChangeText={(text) => setCodigo(text)}
                    />
                    <TextInput
                        placeholder="Nova senha" 
                        secureTextEntry={true} 
                        style={styles.campo}
                        onChangeText={(text) => setSenha(text)}
                    />
                    <TouchableHighlight
                        underlayColor="white" 
                        style={styles.botaoReset} 
                        onPress={() => trocaSenha()}
                    >
                        <Text style={styles.textoReset}>Confirmar</Text>
                    </TouchableHighlight>
                </>
        }<TouchableHighlight
            underlayColor="white" 
            style={styles.botaoReset} 
            onPress={() => {
                modificaReset();
                if(!novaSenha)
                    setNovaSenha(true);
            }}
        >
            <Text style={styles.textoReset}>Cancelar</Text>
        </TouchableHighlight>
        </>
    )
}