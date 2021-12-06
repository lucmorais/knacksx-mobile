import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    campoCadastro: {
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        borderBottomWidth:1,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center'
    },

    tituloEntrar: {
        fontSize: 22,
        color: 'white',
        textAlign:'center'
    },

    botaoEntrarHabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'white'
    },

    tituloInput: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginBottom: 25
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
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        opacity: 0.8,
        paddingVertical: 15
    },
    
    botaoEntrarDesabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#696969',
        opacity: 0.3
    },
})