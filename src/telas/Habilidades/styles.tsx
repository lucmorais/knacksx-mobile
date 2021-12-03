import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 24,
        justifyContent: 'flex-start'
    },

    texto: {
        fontWeight: 'bold',
        fontSize: 20
    },

    campo: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 20,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold'
    },

    botao: {
        marginTop: 30
    },

    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
        textAlign: 'center',
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        color: '#555555',
        paddingBottom: 20,
        paddingTop: 20
    }
})