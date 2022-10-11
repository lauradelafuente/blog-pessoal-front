import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { busca } from "../../../services/Service";
import {Card,CardActions,CardContent,Button,Typography} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaPostagem.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
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
      navigate("/login");
    }
  }, [token]);

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getPost();
  }, [posts.length]);

  return (
    <>
      {posts.map((post) => ( 
        <Box m={2}>
          <Card variant="outlined">
            <CardContent style={{backgroundColor:'#eeeeee'}}>
              <Typography color="textSecondary" gutterBottom className="txtlistap">
                Postagens
              </Typography>
              <Typography variant="h5" component="h2" className="txtlistap">
                {post.titulo}
              </Typography>
              <Typography variant="body2" component="p" className="txtlistap">
                {post.texto}
              </Typography>
              <Typography variant="body2" component="p" className="txtlistap">
                {post.tema?.descricao}
              </Typography>
            </CardContent>
            <CardActions style={{backgroundColor:'#eeeeee'}}>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioPostagem/${post.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" className="marginLeft" size="small" color="primary" style={{backgroundColor:'#689f38'}}>
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarPostagem/${post.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary" style={{backgroundColor:'#558b2f'}}>
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaPostagem;
