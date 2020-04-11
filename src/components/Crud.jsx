import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';

import moment from 'moment';
import 'moment/locale/es';

function Crud(props) {

  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection(props.user.uid).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData);
        setTareas(arrayData)
        
      } catch (error) {
        console.log(error)
      }
    }

    obtenerDatos()

  }, [props.user.uid])

  const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('está vacio')
      return
    }

    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        number: Date.now()
      }

      const data = await db.collection(props.user.uid).add(nuevaTarea)

      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])

      setTarea('')
      
    } catch (error) {
      console.log(error)
    }

    console.log(tarea);
  }

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection(props.user.uid).doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
      
    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('está vacio')
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection(props.user.uid).doc(id).update({
        name: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, number: item.number, name: tarea} : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
          
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            <h3>Lista de tareas</h3>
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                 {moment(item.number).format('LLL')} -  {item.name}

                  <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >Eliminar</button>

                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}

                  >Editar</button>

                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-md-6">
          <h3>
          {
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input 
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            <button 
              className={
                modoEdicion ? "btn btn-warning btn-block" : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Crud;
