import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import {Box} from "@mui/material";
import "./Home.css";
import TabPostagem from "../../components/postagens/tabpostagem/TabPostagem";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { useEffect } from "react";

function Home() {
    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    
    useEffect(() => {
      if (token == "") {
          alert("Você precisa estar logado")
          navigate("/login")
      }
  }, [token])

    return (
       <>
        <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa' style={{backgroundColor:'#e0e0e0'}}>
            <Grid alignItems="center" item xs={6}>
                <Box paddingX={20} >
                    <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box marginRight={1}>
                        <ModalPostagem/>
                     </Box>
                    <Button variant="outlined" className='botao' style={{backgroundColor:'#558b2f'}}>Ver Postagens</Button>
                </Box>
            </Grid>
            <Grid item xs={6} >
                <img src="https://pbs.twimg.com/media/FNxDpgbXEAgXGea?format=jpg&name=small" alt="" width="500px" height="500px" />
            </Grid>
            <Grid xs={12} className='postagens'>
                <TabPostagem />
            </Grid>
        </Grid>
       </>
    );
}

export default Home;