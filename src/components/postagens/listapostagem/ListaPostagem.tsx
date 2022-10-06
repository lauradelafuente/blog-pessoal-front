import React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';

function ListaPostagem() {

  return (
    <>
      <Box m={2} >
        <Card variant="outlined" style={{backgroundColor: '#dcedc8'}}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom className='txtlistap'>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2" className='txtlistap'>
              Título
            </Typography>
            <Typography variant="body2" component="p" className='txtlistap'>
              Texto da Postagem
            </Typography>
            <Typography variant="body2" component="p" className='txtlistap'>
              Tema
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to="" className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft txtlistap" size='small' style={{backgroundColor: '#7cb342'}}>
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to="" className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' style={{backgroundColor: '#689f38'}} className="txtlistap">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>)
}

export default ListaPostagem;