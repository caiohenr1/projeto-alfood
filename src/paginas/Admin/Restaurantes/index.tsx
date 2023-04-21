import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IRestaurante from '../../../interfaces/IRestaurante'

const AdminRestaurante = () => {
    
    const [restaurantList, setRestaurantList] = useState<IRestaurante[]>([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then(response => {
                setRestaurantList(response.data)
            })
            .catch(error => {
                alert('Erro na promisse')
            })
    }, [])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
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
                        {restaurantList.map((restaurant) => (
                            <TableRow key={restaurant.id}>
                                <TableCell>
                                    {restaurant.nome}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/restaurantes/${restaurant.id}`}>EDITAR</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' color='error'>
                                        DELETE
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to='/admin/restaurantes/novo'>
                <Button variant="contained">
                    NOVO RESTAURANTE
                </Button>
            </Link>
        </div>

    )
}

export default AdminRestaurante