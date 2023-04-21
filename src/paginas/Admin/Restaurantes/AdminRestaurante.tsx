import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

import {    Button, 
            Paper,
            Table,
            TableBody,
            TableCell,
            TableContainer,
            TableHead,
            TableRow,
            TextField } from "@mui/material"

import IRestaurante from '../../../interfaces/IRestaurante'
import styles from '../AdminRestaurante.module.css'

const AdminRestaurante = () => {
    const [restaurantList, setRestaurantList] = useState<IRestaurante[]>([])

    const [search, setSearch] = useState('')

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
    console.log(search);
    
    return (
        <div>
            <div className={styles.admin_header}>
                <div>
                    <TextField 
                        className={styles.search_input} 
                        id="outlined-basic" 
                        label="Busque um restaurante" 
                        variant="outlined"
                        onChange={(event) => setSearch(event.target.value)}
                        
                    />
                </div>
                <div>
                    <Link to='/admin/restaurantes/novo'>
                        <Button variant="contained">
                            NOVO RESTAURANTE
                        </Button>
                     </Link>
                </div>
            </div>
            <div >
                <TableContainer component={Paper} >
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
                            {restaurantList
                            .filter((restaurant) => {
                                if(search === '') {
                                    return restaurant
                                } else if(restaurant.nome.toLowerCase().includes(search.toLowerCase())){
                                    return restaurant
                                }
                            })
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