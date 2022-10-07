import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { busca, buscaId, put, post } from '../../../services/Service';

function CadastroPost() {
    let navigate = useNavigate(); 
    const { id } = useParams<{ id: string }>(); //captura os parametros enviados em uma url (id)
    const [temas, setTemas] = useState<Tema[]>([]) //array que trabalha com a listagem de temas cadastrados
    const [token, setToken] = useLocalStorage('token'); //token armazenado no LocalStorage

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")

        }
    }, [token])

    const [tema, setTema] = useState<Tema>( 
        {
            id: 0,
            descricao: ''
        }) //armazena um tema especifico de acordo com o id

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null
    }) //efetua o cadastro das postagens

    useEffect(() => { 
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema]) //pega o tema selecionado e atribui ao State<Postagem>

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id]) //monitora o id, aciona getTemas e faz a busca da postagem por meio do ID 

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            } 
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            } //faz a busca pelo ID em postagens e as informações retornada são armazenadas no statepostagens
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        }) //monta o objeto com as informações que o usuário digita ao fazer uma postagem
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) { //envio das informações que o usuário preencher em postagens 
        e.preventDefault()
        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            }) //se o id já existe, atualiza a postagem
            alert('Postagem atualizada com sucesso');
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            }) //se o id não existe, cadastra uma nova postagem
            alert('Postagem cadastrada com sucesso');
        }
        back()
    }

    function back() {
        navigate('/posts')
    } //direciona para a rota de postagem 

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            } //aciona a função buscaId e retorna a listagem de temas, capturando o valor especifico que o usuario selecioar
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            )) //mapeia os temas e pega o id + descrição de cada tema para exibição
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPost;