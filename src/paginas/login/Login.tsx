import React, {useState, useEffect, ChangeEvent} from 'react';
import {Grid, Typography, TextField, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';

function Login() {
    let navigate = useNavigate()
    const[token, setToken] = useLocalStorage('token');

    const [userLogin, setUserLogin] = useState<UserLogin>( //hook useState faz o controle dos estados dos componentes,set permite alterar
        {
            id: 0,
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
    )
    
    function updateModel(e: ChangeEvent<HTMLInputElement>) { //interface que faz a manipulação de campos de texto HTML
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value 
        }) //aciona as funções digitadas, captura os valores e passa pra updatmodel que joga pra setuser e usa o usestate para atualizar a model 
    }  

    useEffect(() => {
        if(token !== '') { //se o token nao estiver vazio, redireciona para home
            navigate('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {//envia os dados de login do usuario
        e.preventDefault(); //impede que o botao atualize a tela 
        try{
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Você está logado!');
        }catch(error){
            alert('Dados inválidos. Você ainda não pode logar :(')
        } //tentativa de execução
    }

    return(
        <Grid container direction='row' justifyContent='center' alignItems='center' style={{backgroundColor:'#e0e0e0'}}>
            <Grid xs={6} alignItems='center'>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>)=>updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth style={{backgroundColor:'#eeeeee'}}/>
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>)=>updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth style={{backgroundColor:'#eeeeee'}}/>
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary' style={{backgroundColor:'#689f38'}}>
                                Logar
                            </Button>
                        </Box>
                    </form> 
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario' className='text-decorator-none'> 
                        <Typography variant='subtitle1' gutterBottom align='center' className='texto1'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem1'>
            </Grid>
        </Grid>
    );
}

export default Login;