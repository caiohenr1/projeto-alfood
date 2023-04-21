import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IRestaurante from '../../../interfaces/IRestaurante'

const AdminRestaurante = () => {
    const params = useParams()
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
    
    const handleDelete = ( deleteRestaurant: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${deleteRestaurant.id}/`)
        .then( () => {
            const newRestaurantList = restaurantList.filter(restaurant => restaurant.id !== deleteRestaurant.id)
            setRestaurantList([...newRestaurantList])
        })
        
    }

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
            <Link to='/admin/restaurantes/novo'>
                <Button variant="contained">
                    NOVO RESTAURANTE
                </Button>
            </Link>
        </div>

    )
}

export default AdminRestaurante