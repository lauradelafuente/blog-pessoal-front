import React, { useEffect, useState } from "react";
import {Typography,Button,Card,CardActions,CardContent} from "@material-ui/core";
import { Box } from "@mui/material";
import "./DeletarPostagem.css";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { buscaId, deleteId } from "../../../services/Service";
import Postagem from "../../../models/Postagem";

function DeletarPostagem() {
  let navigate = useNavigate(); 
  const {id} = useParams<{id:string}>()//captura os parametros enviados em uma url
  const [token,setToken] = useLocalStorage('token');
  const [posts,setPosts] = useState<Postagem>()

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
      buscaId(`/postagens/${id}`, setPosts, {
          headers: {
            'Authorization': token
          }
        })
      } //depois de receber o id como parametro, aciona o método buscaId
  
  function sim() {
      navigate('/posts')
      deleteId(`/postagens/${id}`, {
        headers: {
          'Authorization': token
          }
        });
      alert('Postagem deletada!');
      }
    
  function nao() {
      navigate('/posts')
    }
    
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Tem certeza que deseja deletar sua obra de arte?
              </Typography>
              <Typography color="textSecondary">
              {posts?.titulo}
                </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary">
                  Sim
                </Button>
              </Box>
              <Box>
                <Button onClick={nao} variant="contained" size="large" color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;
