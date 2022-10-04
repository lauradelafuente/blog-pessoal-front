import React, {useState, useEffect, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import {Grid, Typography, Button, TextField} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {
    let navigate = useNavigate(); //usado em useEffect
    const [confirmarSenha,setConfirmarSenha] = useState<String>("") //verifica se o valor do confirmar senha é igual a senha
    const [user, setUser] = useState<User>( //contém as informações de cadastro
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<User>( //armazena os valores do retorno da API, contém um Json dos usuarios cadastrados
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    useEffect(() => { //no momento em que realizar o cadastro e o usuario estiver cadastrado, direciona p tela de login
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){ //captura o valor de confirmarSenha e armazena 
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) { //monta o objeto para envio 

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) { //envia os valores digitados e atualizados em updatedModel
        e.preventDefault()
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes :( Por favor, verifique as informações de cadastro.')
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' style={{backgroundColor:'#e0e0e0'}}>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto2'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth style={{backgroundColor:'#eeeeee'}}/>
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth style={{backgroundColor:'#eeeeee'}}/>
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' fullWidth type='password' style={{backgroundColor:'#eeeeee'}}/>
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' fullWidth type='password' style={{backgroundColor:'#eeeeee'}}/>
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                            <Button type="submit" variant='contained' className='bcancelar'style={{backgroundColor:'#7cb342'}}>
                                Cancelar
                            </Button>
                            </Link>
                            <Button type='submit' variant='contained' className='botao2' style={{backgroundColor:'#689f38'}}>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;