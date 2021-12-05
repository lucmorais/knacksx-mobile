import moment from "moment";
import React, { useState } from "react";
import { View, Text, Button, SectionList } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Detalhes from "../Detalhes";
import DetalhesExperiencias from "../DetalhesExperiencias";
import styles from "./styles";

export default function ListaGestor({nome, email, telefone, habilidades, experiencias}: any) {
    const [detalhes, setDetalhes] = useState(true);
    const [detalhesHabilidades, setDetalhesHabilidades] = useState(false);
    const [detalhesExperiencias, setDetalhesExperiencias] = useState(false);

    return (
        detalhes? <>
                    <View>
                        <View style={styles.caixa}>
                            <View >
                                <Text >{nome}</Text>
                            </View>
                            <View >
                                <Text >{email}</Text>
                            </View>
                            <View>
                                <Text >{telefone}</Text>
                            </View>
                        </View>
                        <View style={styles.caixa}>
                            <View>
                                <Button title="Detalhes" color="#345D7E" onPress={() => {
                                    setDetalhes(false);
                                }}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divisor}/>
                </>:<View style={styles.caixaDetalhes}>
                        <View style={styles.cabecalho}>
                            <View>
                                <Text style={styles.nome}>{nome}</Text>
                            </View>
                            <View>
                                <Button title="Esconder detalhes" onPress={() => {
                                    setDetalhes(true);
                                }}/>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.tituloDetalhes}>Habilidades</Text>
                            <FlatList
                                data={habilidades}
                                renderItem={({ item }) => <Detalhes {...item} />}
                                listKey={(_item: any, index: { toString: () => string; }) => 'D' + index.toString()}
                            />
                        </View>
                        <View>
                            <Text style={styles.tituloDetalhes}>Experiencias</Text>
                            <FlatList
                                data={experiencias}
                                renderItem={({ item }) => <DetalhesExperiencias {...item} />}
                                listKey={(item: any, index: { toString: () => string; }) => 'D' + index.toString()}
                            />
                        </View>
                        <View>
                            <Button title="Esconder detalhes" onPress={() => {
                                setDetalhes(true);
                            }}/>
                        </View>
                    </View>
    )
}