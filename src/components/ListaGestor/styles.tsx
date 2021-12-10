import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    caixa: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 24,
        paddingVertical:5
    },
    
    divisor: {
        borderBottomWidth: 2,
        borderBottomColor: '#C7C7C7',
        marginBottom: 20,
        marginTop: 0,
        marginHorizontal: 24
    },

    caixaDetalhes: {
        flex: 1,
        marginHorizontal: 20,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#EEDAE5',
        borderRadius: 10,
        marginBottom: 50,
        height: '100%'
    },

    tituloDetalhes: {
        fontSize: 23,
        marginBottom: 30,
        borderBottomWidth:2,
        fontWeight: 'bold',
    },

    nome: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: '#474A51',
    },

    cabecalho: {
        marginBottom: 30
    },

    tituloNome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#474A51',
    },

    tituloDados: {
        textAlign: 'center',
        color: '#555555',
        fontSize: 18,
    },

    botaoMostrar: {
        backgroundColor: '#42b72a',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    botao: {
        backgroundColor: '#42b72a',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20
    },

    textoAdicionar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },
})