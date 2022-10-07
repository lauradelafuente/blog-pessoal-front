import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import useLocalStorage from "react-use-localstorage";
import './Navbar.css'

function Navbar() {
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();
    function goLogout() {
        setToken('')
        alert("Usuário deslogado")
        navigate('/login')
    } //elimina o token ao deslogar e redireciona à tela de login
    return (
        <>
        <AppBar position="static" style={{backgroundColor:'#558b2f'}}>
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
    </>
)
}

export default Navbar;