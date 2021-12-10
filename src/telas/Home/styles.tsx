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
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        borderColor: "#808080",
        borderWidth: 1,
        fontSize:16,
    },

    botaoEditarDesabilitado: {
        backgroundColor: '#42b72a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.4,
    },

    botaoEditar: {
        backgroundColor: '#42b72a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8
    },

    botaoAlterarDesabilitado: {
        backgroundColor: '#8a2be2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.4,
    },

    botaoAlterar: {
        backgroundColor: '#8a2be2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8
    },

    botaoCancelarDesabilitado: {
        backgroundColor: '#8b0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.4,
    },

    botaoCancelar: {
        backgroundColor: '#8b0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        opacity: 0.8
    },

    textoEditar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },

    botaoSalvar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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

    containerGestor: {
        justifyContent: 'center',
        padding: 24,
    },

    textoBuscar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center',
    },

    textoVoltar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center',
    },

    botaoBuscar: {
        backgroundColor: '#474A51',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },

    botaoVoltar: {
        backgroundColor: '#345D7E',
        paddingVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
        textAlignVertical: 'top',
        marginBottom: 5,
        marginTop: 5,
        marginHorizontal: 24,
    },

    resultado: {
        fontSize: 16,
        textAlignVertical: 'center',
        color: '#808080',
        marginHorizontal: 24,
    },

    tituloResultado: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        color: '#555555',
        paddingBottom: 20,
        paddingTop: 20
    }
})