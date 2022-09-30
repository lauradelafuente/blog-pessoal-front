import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <>
        <AppBar position="static">
            <Toolbar variant="dense" className='txt'>
                <Box className='cursor' >
                    <Typography variant="h5" color="inherit" className='txt' style={{fontFamily: 'Quicksand'}}>
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" style={{fontFamily: 'Quicksand'}}>
                            home
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" style={{fontFamily: 'Quicksand'}}>
                            postagens
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" style={{fontFamily: 'Quicksand'}}>
                            temas
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit" style={{fontFamily: 'Quicksand'}}>
                            cadastrar tema
                        </Typography>
                    </Box>
                    <Link to='/login' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit" style={{fontFamily: 'Quicksand'}}>
                            logout
                            </Typography>
                        </Box>
                    </Link>
                </Box>

            </Toolbar>
        </AppBar>
    </>
)
}

export default Navbar;