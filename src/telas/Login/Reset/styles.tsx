import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    conteudo: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
    },

    campo: {
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 60,
        borderRadius: 25,
        fontSize:16,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
    },

    botaoReset: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
        opacity: 0.8
    },

    textoReset: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign:'center'
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

    botaoEntrarHabilitado: {
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'white'
    },

    tituloEntrar: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },

    alertaCadastro: {
        color: 'yellow',
        fontSize: 18
    }
})