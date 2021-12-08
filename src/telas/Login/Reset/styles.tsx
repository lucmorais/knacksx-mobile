import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    conteudo: {
        alignSelf: 'center',
        marginTop: -100,
        position: 'absolute'
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

    botaoResetDesabilitado: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8,
        borderColor: 'white',
        borderWidth: 1
    },

    botaoReset: {
        backgroundColor: '#229A00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8
    },

    botaoResetCancelar: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 20,
        opacity: 0.9
    },

    textoReset: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },

    textoResetCancelar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },

   sucesso: {
        width: '100%',
        height: 150
    },

    retorno: {
        height: 120,
        width: '100%',
        marginTop: -350,
        position: 'absolute'
    },

    tituloReset: {
        fontSize: 22,
        color: 'white',
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    caixaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})