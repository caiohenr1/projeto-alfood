import { Button, Input, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'

const Form = () => {
    const [restaurantName, setRestaurantName] = useState('')

    const params = useParams()

    useEffect(() => {
        if(params.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
            .then(response => {
                setRestaurantName(response.data.nome)
            })
        }
    }, [params]) // Pegando o restaurante pelo ID e carregando seus dados com o uso do useParams
    
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // após enviar o formulário verificiamos se o restaurante já possuí um ID, se sim (if) ele altera o conteudo existente no caso o nome que passamos no objeto, se não(else), ele faz um post adicionando aquele novo restaurante para a lista.
        
        if(params.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
                nome: restaurantName
            })
            .then(response => {
                alert('Restaurante alterado com sucesso')
            })
        }else {
            axios.post<IRestaurante>('http://localhost:8000/api/v2/restaurantes/', {
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
        <form onSubmit={handleSubmit} >
            <TextField
                id="outlined-basic"
                label="Nome do Restaurante"
                variant="outlined"
                value={restaurantName}
                onChange={event => setRestaurantName(event.target.value)}
            />
            {params.id ? <Button type='submit'variant="outlined">ALTERAR</Button> : 
            <Button type='submit'variant="outlined">CADASTRAR</Button>}
        </form>
    )
}
export default Form