import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();//se o usuario nao for logado, é direcionado pra tela de login

  useEffect(()=>{ //se o usuário não estiver logado, é redirecionado para a tela de login
    if(token === '') {
      alert("Você precisa estar logado")
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
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
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