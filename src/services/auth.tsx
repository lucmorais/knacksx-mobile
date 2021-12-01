import { http } from "../utils/http";

export default async function logIn(email: string, senha: string) {
    return await http.post('/login', { email, senha });
}