import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,

} from "@mui/material"

import IRestaurante from '../../../interfaces/IRestaurante'
import styles from '../AdminRestaurante.module.css'
import { api } from '../../../http/api'
import axios, { AxiosRequestConfig } from 'axios'
import { IPaginacao } from '../../../interfaces/IPaginacao'

interface IParametrosBusca {
    ordering?: string
    search?: string
}



const AdminRestaurante = () => {

    const [restaurantList, setRestaurantList] = useState<IRestaurante[]>([])

    // search
    const [nextPage, setNextPage] = useState('')
    const [previousPage, setPreviousPage] = useState('')

    const [search, setSeach] = useState('')
    const loadData = (url: string, opcoes: AxiosRequestConfig = {}) => {

        axios.get<IPaginacao<IRestaurante>>(url, opcoes)
            .then(resposta => {
                setRestaurantList(resposta.data.results)
                setNextPage(resposta.data.next)
                setPreviousPage(resposta.data.previous)
            })
            .catch(erro => {
                console.log(erro)
            })
    }
    // search


    useEffect(() => {
        api.get('restaurantes/')
            .then(response => {
                setRestaurantList(response.data)
            })
            .catch(error => {
                alert('Erro na promisse')
            })
    }, [])

    const handleDelete = (deleteRestaurant: IRestaurante) => {
        api.delete(`restaurantes/${deleteRestaurant.id}/`)
            .then(() => {
                const newRestaurantList = restaurantList.filter(restaurant => restaurant.id !== deleteRestaurant.id)
                setRestaurantList([...newRestaurantList])
            })

    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        const opcoes = {
            params: {

            } as IParametrosBusca
        }
        if (search) {
            opcoes.params.search = search
        }
        loadData('http://localhost:8000/api/v1/restaurantes/', opcoes)

    }

    return (
        <div>
            <div className={styles.admin_header}>
                <form onSubmit={handleSearch}>
                    <TextField
                        className={styles.search_input}
                        id="outlined-basic"
                        label="Busque um restaurante"
                        variant="outlined"
                        value={search}
                        onChange={(event) => setSeach(event.target.value)}
                    />
                    <Button type='submit' variant="contained">Pesquisar</Button>
                </form>
                <div>
                    <Link to='/admin/restaurantes/novo'>
                        <Button variant="contained">
                            NOVO RESTAURANTE
                        </Button>
                    </Link>
                </div>
            </div>
            <div >
                <TableContainer component={Paper}  >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    [ EDITAR ]
                                </TableCell>
                                <TableCell>
                                    DELETE
                                </TableCell>
                            </TableRow>
                            <TableRow>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantList
                                .map((restaurant) => (
                                    <TableRow key={restaurant.id}>
                                        <TableCell>
                                            {restaurant.nome}
                                        </TableCell>
                                        <TableCell>
                                            [ <Link to={`/admin/restaurantes/${restaurant.id}`}>EDITAR</Link> ]
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant='outlined'
                                                color='error'
                                                onClick={() => handleDelete(restaurant)}
                                            >
                                                DELETE
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>

    )
}

export default AdminRestaurante