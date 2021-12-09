import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    campoCadastro: {
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 60,
        borderRadius: 10,
        fontSize:16,
        paddingLeft: 10
    },

    campoCadastroErrado: {
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 60,
        borderRadius: 10,
        fontSize:16,
        paddingLeft: 10,
        borderWidth: 4,
        borderColor: '#FF0800'
    },

    tituloEntrar: {
        fontSize: 22,
        color: 'white',
        textAlign:'center',
        fontWeight: 'bold'
    },

    botaoEntrarHabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 25,
        backgroundColor: '#474A51',
    },

    tituloInput: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginBottom: 1
    },

    alertaCadastro: {
        fontSize: 26,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 20
    },

    avisoCadastro: {
        textAlign: 'center',
        paddingBottom: 20
    },

    caixaAlerta: {
        height: 215,
        width: '100%',
        marginTop: 0,
    },
    
    botaoEntrarDesabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 25,
        backgroundColor: '#353839',
        opacity: 0.3
    },

    tituloCadastro: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 70,
        textAlign: 'center'
    },

    botaoFinalizaHabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 40,
        backgroundColor: '#42b72a',
    },
})