import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    conteudo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    botao: {
        marginRight: 16,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },

    icone: {
        paddingLeft: 16
    },

    usuario: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    botaoLogout: {
        paddingRight: 16,
        paddingVertical: 7,
        paddingLeft: 16,
        marginRight: 16,
        backgroundColor: 'white',
        borderRadius: 10
    },

    botaoCadastro: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingVertical: 10,
        marginRight: 16,
        backgroundColor: '#345D7E',
        borderRadius: 5
    },

    tituloCadastro: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

    textoAdicionar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#345D7E',
        textAlign:'center'
    },
})