import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroTema.css';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

function CadastroTema() {
    let navigate = useNavigate(); 
    const {id} = useParams<{id:string}>()//captura os parametros enviados em uma url (id)
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    const [tema,setTema] = useState<Tema>({
        id:0,
        descricao:''
    })

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme:"colored",
                progress: undefined,
            });;
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
            toast.success('Tema atualizado!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme:"colored",
                progress: undefined,
            });;
        } else { //se o id não existir, poderá ser feito o cadastro de um novo tema 
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema cadastrado!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme:"colored",
                progress: undefined,
            });;
        }
        back() //redireciona para o componente temas (/temas)
    }

    function back() {
        navigate('/temas')
    }

    return (
        <Container maxWidth="sm" className='container'>
            <Box maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h2" color="textSecondary" component="h1" align="center" className='textoform'>TEMA</Typography>
                <Typography variant="h5" color="textSecondary" component="h1" align="center" className='textoform'>O tema pode ser uma liga, um(a) jogador(a), um time, fique à vontade na descrição</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descrição" variant="outlined" name="descricao" margin="normal" fullWidth style={{backgroundColor:'white'}}/>
                <Button type="submit" variant="contained" color="primary" style={{backgroundColor:'#283593'}}>
                    Finalizar
                </Button>
            </form>
            </Box>
        </Container>
    )
}

export default CadastroTema;