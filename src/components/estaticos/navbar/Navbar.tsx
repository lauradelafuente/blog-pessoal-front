import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import {toast} from 'react-toastify'; 

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme:"colored",
            progress: undefined,
        });
        navigate('/login')
    } //elimina o token ao deslogar e redireciona à tela de login

    var navbarComponent;
    if (token != "") { ////navbar é renderizado novamente se houver um token
        navbarComponent = <AppBar position="static" style={{backgroundColor:'#283593'}}>
        <Toolbar variant="dense" space-evenly>
            <Box className='cursor' paddingX={5}>
                <Typography variant="h5" color="inherit" className='txt'>
                    SpaceSports
                </Typography>
            </Box>

        <Grid container justifyContent="flex-end">
            <Box display="flex" justifyContent="start">
                <Link to='/home' className="text-decorator-none">
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            HOME
                        </Typography>
                    </Box>
                </Link>
                <Link to='/posts' className="text-decorator-none">
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            POSTS
                        </Typography>
                    </Box>
                </Link>
                <Link to='/temas' className="text-decorator-none">
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            THEMES
                        </Typography>
                    </Box>
                </Link>
                <Link to='/formularioTema' className="text-decorator-none">
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            REGISTRER THEMES
                        </Typography>
                    </Box>
                </Link>
                    <Box mx={1} className='cursor' paddingX={5} onClick={goLogout}>
                        <Typography variant="h6" color="inherit" className='txt'>
                        LOGOUT
                        </Typography>
                    </Box>
            </Box>
        </Grid>
        </Toolbar>
    </AppBar>
    }

    return (
    <>
        {navbarComponent}
    </>
) 
}

export default Navbar;