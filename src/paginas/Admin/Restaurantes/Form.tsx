import { Box, Button, Input, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import { api } from '../../../http/api'

const Form = () => {
    const [restaurantName, setRestaurantName] = useState('')

    const params = useParams()

    useEffect(() => {
        if(params.id) {
            api.get<IRestaurante>(`restaurantes/${params.id}/`)
            .then(response => {
                setRestaurantName(response.data.nome)
            })
        }
    }, [params]) // Pegando o restaurante pelo ID e carregando seus dados com o uso do useParams
    
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if(params.id) {
            api.put(`restaurantes/${params.id}/`, {
                nome: restaurantName
            })
            .then(response => {
                alert('Restaurante alterado com sucesso')
            })
        }else {
            api.post<IRestaurante>('restaurantes/', {
            nome: restaurantName
        })
        .then(() => {
            alert('Restaurante cadastrado com sucesso!')
        })
        .catch((error) => {
            alert('Erro, tente novamente mais tarde!')
        })
        }

    }
    return (
        <Box sx={ { display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            <Typography component='h1' variant='h6'>Cadastro de Restaurantes</Typography>
                <Box component='form' onSubmit={handleSubmit} >
                    <TextField
                        id="outlined-basic"
                        label="Nome do Restaurante"
                        variant="outlined"
                        value={restaurantName}
                        onChange={event => setRestaurantName(event.target.value)}
                        fullWidth
                        required
                    />
                    {params.id ? <Button sx={{marginTop: 1}} fullWidth type='submit'variant="outlined">ALTERAR</Button> : 
                    <Button sx={{marginTop: 1}} fullWidth type='submit'variant="outlined">CADASTRAR</Button>}
            </Box>
        </Box>
        
    )
}
export default Form