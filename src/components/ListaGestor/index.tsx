import moment from "moment";
import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableHighlight} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Detalhes from "../Detalhes";
import DetalhesExperiencias from "../DetalhesExperiencias";
import styles from "./styles";

export default function ListaGestor({nome, email, telefone, habilidades, experiencias}: any) {
    const [detalhes, setDetalhes] = useState(true);

    return (
        detalhes? <>
                    <View>
                        <View style={styles.caixa}>
                            <View >
                                <Text style={styles.tituloNome}>{nome}</Text>
                            </View>
                            <View >
                            <TouchableHighlight
                                underlayColor="#E9E3CE" 
                                style={styles.botaoMostrar} 
                                onPress={() => {
                                    setDetalhes(false);
                                }}
                            >
                                <Text style={styles.textoAdicionar}>Detalhes</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divisor}/>
                </>:<View style={styles.caixaDetalhes}>
                        <View>
                            <View style={styles.cabecalho}>
                                <Text style={styles.nome}>NOME</Text>
                                <Text style={styles.tituloDados}>{nome}</Text>
                                <Text style={styles.nome}>EMAIL</Text>
                                <Text style={styles.tituloDados}>{email}</Text>
                                <Text style={styles.nome}>TELEFONE</Text>
                                <Text style={styles.tituloDados}>{telefone}</Text>
                            </View>
                        </View>
                        {habilidades.length > 0 && <View>
                            <Text style={styles.tituloDetalhes}>Habilidades</Text>
                            <FlatList
                                data={habilidades}
                                renderItem={({ item }) => <Detalhes {...item} />}
                                listKey={(_item: any, index: { toString: () => string; }) => 'D' + index.toString()}
                            />
                        </View>}
                        {experiencias. length > 0 &&<View>
                            <Text style={styles.tituloDetalhes}>Experiencias</Text>
                            <FlatList
                                data={experiencias}
                                renderItem={({ item }) => <DetalhesExperiencias {...item} />}
                                listKey={(item: any, index: { toString: () => string; }) => 'D' + index.toString()}
                            />
                        </View>}
                        <View>
                            <TouchableHighlight
                                underlayColor="#E9E3CE" 
                                style={styles.botao} 
                                onPress={() => {
                                    setDetalhes(true);
                                }}
                            >
                                <Text style={styles.textoAdicionar}>Esconder detalhes</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
    )
}