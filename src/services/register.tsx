import { http } from "../utils/http";

export default async function registerIn(nome: string, tipo: string, email: string, telefone: string, senha: string) {
    return await http.post('/usuarios', { nome, tipo, email, telefone, senha });
}