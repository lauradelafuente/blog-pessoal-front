import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();//se o usuario nao for logado, é direcionado pra tela de login

  useEffect(()=>{ //se o usuário não estiver logado, é redirecionado para a tela de login
    if(token === '') {
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

  async function getTema(){
    await busca("/temas",setTemas, {
      headers: {
        'Authorization':token 
      }//passando o token como autorização no cabeçalho para autenticar a requisição na API 
    })
  }

  useEffect(()=>{
    getTema() //primeiro parametro: faz a requisição da API
  }, [temas.length]) //sempre que o tamanho do tema modificar, adiciona a função getTema

  return (
    <>
    { temas.map(tema => (
      <Box m={2} key={tema.id} className='centro'>
        <Card variant="outlined">
          <CardContent style={{backgroundColor:'#eeeeee'}}>
            <Typography color="textSecondary" gutterBottom className='txtlistat'>
              Tema
            </Typography>
            <Typography variant="h5" component="h2" className='txtlistat'>
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions style={{backgroundColor:'#eeeeee'}}>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1} className="botao">
                  <Button variant="contained" size='small' style={{backgroundColor:'#689f38'}}>
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' style={{backgroundColor:'#558b2f'}}>
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    ))
    }
    </>
  );
}


export default ListaTema;