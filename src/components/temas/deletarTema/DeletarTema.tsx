import React, { useEffect, useState } from "react"
import {Card,CardActions,CardContent,Button,Typography,} from "@material-ui/core";
import { Box } from "@mui/material";
import "./DeletarTema.css";
import { useNavigate, useParams } from "react-router-dom";
import { buscaId, deleteId } from "../../../services/Service";
import Tema from "../../../models/Tema";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function DeletarTema() {
  let navigate = useNavigate(); 
    const {id} = useParams<{id:string}>()//captura os parametros enviados em uma url
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
    const [tema,setTema] = useState<Tema>()

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
    
    function sim() {
        navigate('/temas')
        deleteId(`/temas/${id}`, {
          headers: {
            'Authorization': token
            }
          });
          toast.success('Tema deletado!', {
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
      
    function nao() {
        navigate('/temas')
      }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent style={{backgroundColor:'#eeeeee'}}>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom className='txtlistat'>
              Tem certeza que deseja deletar sua obra de arte?
              </Typography>
              <Typography color="textSecondary">{tema?.descricao}</Typography>
            </Box>
          </CardContent>
          <CardActions style={{backgroundColor:'#eeeeee'}}>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size="large" style={{backgroundColor:'#689f38'}}>
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size="large" style={{backgroundColor:'#558b2f'}}>
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
export default DeletarTema;
