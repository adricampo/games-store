import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editarProductoAction } from '../actions/productosActions'
import { useHistory } from 'react-router-dom'

const EditarProducto = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    // nuevo state de producto
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: '',
    }) 

    // producto a editar
    const productoEditar = useSelector(state => state.productos.productoEditar)

    // llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoEditar)
    }, [productoEditar])

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    // submit de guardado de datos nuevo
    const submitEditarProducto = e => {
        e.preventDefault()

        dispatch( editarProductoAction(producto) )

        history.push('/')
    }
    
    // destructuring propiedades producto
    const { nombre, precio } = producto

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />   
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />   
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                            Guardar cambios</button>
                        </form>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto