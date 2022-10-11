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

export const busca = async(url:any, setDado:any, header:any) => { //aciona o método busca, requisição para listar postagens/temas. 
    const resposta = await api.get(url,header) //requisição da API junto ao token(header), confirma os dados válidos e armazena na variavel resposta
    setDado(resposta.data)//captura todos os valores da requisiçao e exibe no front
}

export const buscaId = async(url:any, setDado:any, header:any) => { 
    const resposta = await api.get(url,header) 
    setDado(resposta.data)
}

export const post = async(url:any, dados:any, setDado:any, header:any) => { 
    const resposta = await api.post(url,dados,header) 
    setDado(resposta.data)
}

export const put = async(url:any, dados:any, setDado:any, header:any) => { 
    const resposta = await api.put(url,dados,header) 
    setDado(resposta.data)
}

export const deleteId = async(url:any, header:any) => { 
    await api.delete(url,header) 
}



