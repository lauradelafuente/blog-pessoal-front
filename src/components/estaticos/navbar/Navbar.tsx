import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <>
        <AppBar position="static" style={{backgroundColor:'#558b2f'}}>
            <Toolbar variant="dense" className='txt' space-evenly>
                <Box className='cursor' paddingX={5}>
                    <Typography variant="h5" color="inherit" className='txt'>
                        SpaceSports
                    </Typography>
                </Box>

            <Grid container justifyContent="flex-end">
                <Box display="flex" justifyContent="start">
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            HOME
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            POSTS
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            THEMES
                        </Typography>
                    </Box>
                    <Box mx={1} className='cursor' paddingX={5}>
                        <Typography variant="h6" color="inherit" className='txt'>
                            REGISTRER THEMES
                        </Typography>
                    </Box>
                    <Link to='/login' className='text-decorator-none'>
                        <Box mx={1} className='cursor' paddingX={5}>
                            <Typography variant="h6" color="inherit" className='txt'>
                            LOGOUT
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </Grid>
            </Toolbar>
        </AppBar>
    </>
)
}

export default Navbar;