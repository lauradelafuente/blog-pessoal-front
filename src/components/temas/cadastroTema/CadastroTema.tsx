import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroTema.css';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';

function CadastroTema() {
    let navigate = useNavigate(); 
    const {id} = useParams<{id:string}>()//captura os parametros enviados em uma url (id)
    const [token,setToken] = useLocalStorage('token');
    const [tema,setTema] = useState<Tema>({
        id:0,
        descricao:''
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id]) //se o id existir, aciona findById

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        } //depois de receber o id como parametro, aciona o método buscaId
    
    function updatedTema(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    } //captura os valores do form e atribui ao setTema que faz a alteração no useState<Tema>

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema" + JSON.stringify(tema))
        if (id !== undefined) {
            console.log(tema)
            put(`/temas`, tema, setTema, { //rota da API, dados cadastrados e captura o objeto validado
                headers: {
                    'Authorization': token
                }
            }) //se o id existir, tentará atualizar o tema
            alert('Tema atualizado!');
        } else { //se o id não existir, poderá ser feito o cadastro de um novo tema 
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado!');
        }
        back() //redireciona para o componente temas (/temas)
    }

    function back() {
        navigate('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;