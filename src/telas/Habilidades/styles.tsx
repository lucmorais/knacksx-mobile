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
        borderRadius: 10,
        fontSize:16,
        paddingLeft: 10,
        marginBottom: 10
    },

    botao: {
        backgroundColor: '#8a2be2',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8,
    },

    botaoDesabilitado: {
        backgroundColor: '#8a2be2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.4,
    },

    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        color: '#555555',
        paddingBottom: 20,
        paddingTop: 20
    },

    textoAdicionar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },
})