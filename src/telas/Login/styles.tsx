import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    campo: {
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

    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },

    botaoReset: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 20,
        opacity: 0.8
    },

    textoReset: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center',
    },

    botaoEntrarDesabilitado: {
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#0095f6',
        fontWeight: 'bold',
        opacity: 0.3
    },

    botaoEntrarHabilitado: {
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#0095f6',
        fontWeight: 'bold'
    },

    tituloBotaoEntrar: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },

    tituloLogin: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 50
    },

    alertaCadastro: {
        color: 'yellow',
        fontSize: 18
    },

    deny: {
        width: '100%',
        position: 'absolute',
        marginTop: 46,
        backgroundColor: '#A9A9A9',
        borderRadius: 5,
        alignItems: 'center'
    },

    textoDeny: {
        textAlign: 'center'
    }
})