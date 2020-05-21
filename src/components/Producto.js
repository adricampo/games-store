import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

// redux
import { useDispatch } from 'react-redux'
import { eliminarProductoAction, obtenerProductoEditarAction } from '../actions/productosActions'

const Producto = ({ producto }) => {
    const { nombre, precio, id } = producto

    const dispatch = useDispatch()
    const history = useHistory()

    // confirmar si se elimina
    const confirmarEliminarProducto = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( eliminarProductoAction(id) )
            }
        })
    }

    // función que redirige a editar producto
    const redireccionarEditarProducto = producto => {
        dispatch( obtenerProductoEditarAction(producto) )
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">{precio}€</span></td>
            <td className="acciones">
                <button 
                    type='button'
                    onClick={() => redireccionarEditarProducto(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
    )

}

export default Producto