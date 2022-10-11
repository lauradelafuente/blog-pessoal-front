import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Typography, Grid } from '@material-ui/core';
import {Box} from '@mui/material';
import './Footer.css';
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    var footerComponent;
    if (token != "") {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
            <Box className='box1' style={{backgroundColor:'#558b2f'}}>
                <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" align="center" gutterBottom className='texto3'>Me acompanhe nas redes sociais:</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <a href="https://github.com/lauradelafuente" target="_blank">
                        <GitHubIcon className="redes"/>
                    </a>
                    <a href="https://www.instagram.com/lau.rinha_/" target="_blank">
                        <InstagramIcon className="redes"/>
                    </a>
                    <a href="https://www.linkedin.com/in/laura-delafuente/" target="_blank">
                        <LinkedInIcon className="redes"/>
                    </a>
                </Box>
            </Box>
            <Box className='box2'  style={{backgroundColor:'#8bc34a'}}>
                <Box paddingTop={1}>
                    <Typography variant="subtitle2" align="center" gutterBottom>© 2022 Copyright:</Typography>
                </Box>
                <Box>
                    <a target="_blank" href="https://brasil.generation.org">
                        <Typography variant="subtitle2" gutterBottom className='text-decorator-none' align="center">github.com/lauradelafuente</Typography>
                    </a>
                </Box>
            </Box>
        </Grid>
    </Grid>
    }

    return (
        <>
        {footerComponent}
        </>
    )
}

export default Footer;