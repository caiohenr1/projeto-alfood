// hooks
import { useState, useEffect } from 'react'

// components
import Restaurante from './Restaurante';

// interfaces typescript
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';

// request
import axios from 'axios';

// mui / styles
import { Button } from '@mui/material';
import style from './ListaRestaurantes.module.scss';


const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurants(response.data.results)
        setNextPage(response.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
    
  const viewMoreRestaurants = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
      .then(response => {
        setRestaurants([...restaurants, ...response.data.results])
        setNextPage(response.data.next)
      })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurants?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {nextPage && <Button onClick={viewMoreRestaurants} variant="contained" >ver mais</Button>}
    </section>
  )
}

export default ListaRestaurantes