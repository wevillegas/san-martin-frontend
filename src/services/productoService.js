import api from './api';

// Función para pedir la lista completa de productos
export const obtenerProductos = async () => {
    try {
        const respuesta = await api.get('/productos');
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener productos desde el backend:', error);
        throw error;
    }
};

// Función para traer UN solo producto por su ID
export const obtenerProductoPorId = async (id) => {
    try {
        const respuesta = await api.get(`/productos/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};

// Función para CREAR un nuevo producto (Requiere Token)
export const crearProducto = async (datosProducto) => {
    try {
        const token = localStorage.getItem("token");
        
        const respuesta = await api.post('/productos', datosProducto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};

// Función para ACTUALIZAR un producto existente (Requiere Token)
export const actualizarProducto = async (id, datosProducto) => {
    try {
        const token = localStorage.getItem("token");
        
        const respuesta = await api.put(`/productos/${id}`, datosProducto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};

// Función para ELIMINAR un producto (Requiere Token)
export const eliminarProducto = async (id) => {
    try {
        const token = localStorage.getItem("token");
        
        const respuesta = await api.delete(`/productos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};