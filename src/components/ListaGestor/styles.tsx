import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    caixa: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24
    },
    
    divisor: {
        borderBottomWidth: 2,
        borderBottomColor: '#C7C7C7',
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 24
    },

    caixaDetalhes: {
        flex: 1,
        margin: 20,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#EEDAE5',
        borderRadius: 10,
        marginBottom: 50
    },

    tituloDetalhes: {
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginBottom: 30
    },

    nome: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    cabecalho: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30
    }
})