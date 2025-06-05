import { literal, fn, col } from 'sequelize';
import { Carrito } from "../models/Carrito.js"
import { CarritoProducto } from "../models/CarritoProducto.js"
import { Producto } from "../models/Producto.js"

export const listarproductoscarritos = async (req, res) => {                       //estudiar este codigo cuando se remplza el for
    try {
        const userId = req.user.id;
        // Obtener carrito con subconsultas
        const carrito = await Carrito.findOne({
            attributes: [
                'id',
                [literal(`(SELECT direccion FROM usersClientes WHERE idUser = carritos.createdBy)`), 'direccion'],
                [literal(`(SELECT COUNT(id) FROM carritosProductos WHERE carritosProductos.idCarrito = carritos.id)`), 'cantidadProductos']
            ],
            where: { createdBy: userId },
            raw: true
        });

        if (!carrito) {
            return res.status(200).json({
                message: 'Guardado correctamente',
                data: {
                    carrito: null,
                    productos: []
                }
            });
        }

        // Obtener productos del carrito con JOIN manual usando raw SQL
        const productos = await CarritoProducto.findAll({
            attributes: [
                'id',
                'idCarrito',
                'idProducto',
                'cantidad',
                'valorUnidad',
                [
                    literal(`(SELECT nombre FROM productos WHERE productos.id = carritosProductos.idProducto)`),
                    'nombre'
                ],
                [
                    literal(`(SELECT stock FROM productos WHERE productos.id = carritosProductos.idProducto)`),
                    'stock'
                ],
                [
                    literal(`(SELECT imagen FROM productos WHERE productos.id = carritosProductos.idProducto)`),
                    'imagen'
                ]
            ],
            where: {
                idCarrito: carrito.id
            },
            raw: true
        });

        // Calcular total
        let total = 0;
        productos.forEach(producto => {
            total += producto.cantidad * producto.valorUnidad;
        });

        carrito.total = total;

        return res.status(200).json({
            message: 'Guardado correctamente',
            data: {
                carrito,
                productos
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'error al consultar', error })
    }
};



export const contarProducto = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
            attributes: ['id'],
            where: {
                createdBy: 1
            },
            raw: true
        })


        let contarProductos = 0
        if (carrito != null) {
            contarProductos = await CarritoProducto.count({
                where: {
                    idCarrito: carrito.id
                }
            })

        }
        return res.status(200).json({ message: 'Consultado con exito', data: contarProductos })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}

