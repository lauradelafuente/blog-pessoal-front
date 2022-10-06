import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://blogpessoallaura.onrender.com'
})

export const cadastroUsuario = async(url:any, dados:any, setDado:any) => { //url:/usuarios/login; dados: recebe os dados, setDado recebe com o token. 
    const resposta = await api.post(url,dados) //async aguarda (awair) o retorno da API pra acionar setDado
    setDado(resposta.data)
} 

export const login = async(url:any, dados:any, setDado:any) => { //url:/usuarios/login; dados: recebe os dados, setDado recebe com o token. 
    const resposta = await api.post(url,dados) //async aguarda (awair) o retorno da API pra acionar setDado
    setDado(resposta.data.token)
}