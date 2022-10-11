import React, {useState} from 'react'
import {AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import {TabContext, TabPanel} from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';

function TabPostagem() {
    const [value, setValue] = useState('1') //exibe primeiro a lista de postagens (1)
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){ //manipula a alteração no painel de tabs 
        setValue(newValue); //modifica o valor de newvalue atribuindo diferentes valores (1 e 2)
    }

  return (
    <>
      <TabContext value={value}>  
        <AppBar position="static" style={{backgroundColor:'#558b2f'}}>
          <Tabs centered indicatorColor="secondary" value={false} onChange={handleChange}> 
            <Tab label="Todas as postagens" value="1" className='txttab'/>
            <Tab label="Sobre" value="2" className='txttab'/>
          </Tabs>
        </AppBar>
        <TabPanel value="1" style={{backgroundColor:'#e0e0e0'}}>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" style={{backgroundColor:'#e0e0e0'}}>
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">SOBRE</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos ut eveniet natus totam et, voluptate dicta tempore alias, odio nobis non eius cupiditate minima inventore pariatur! Ipsum itaque consectetur voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo velit consequuntur suscipit fugiat, nam quis quod quaerat veritatis et, vel ratione beatae, facere neque! Quo animi porro voluptate saepe deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore adipisci, officia aut quidem dolorum deserunt iure dolorem doloribus velit nobis quas consequatur at ullam odit, nesciunt est nulla nihil excepturi!</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;