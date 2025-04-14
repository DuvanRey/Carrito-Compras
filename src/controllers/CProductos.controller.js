import { where } from "sequelize"
import { Categoria } from "../models/Categoria.js"
import { Producto } from "../models/Producto.js"

export const categorias = async (req, res) => {                       //estudiar este codigo cuando se remplza el for
    try {
        const params = req.params
        const categorias = await Categoria.findAll({
            attributes: [
                'id',
                'nombre'
        
            ],
            where: {
                idTienda: params.idTienda,
            },
            raw: true
        })


        for (const categoria of categorias) {
            categoria.productos = await Producto.findAll({
                attributes: [
                    'sku',
                    'nombre',
                    'precio',
                    'stock',
                    'imagen'
                ],
                where: {
                    idCategoria: categoria.id
                }
            })
        }

        return res.status(200).json({ message: 'Tienda obtenida con exito', data: categorias })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener Tienda', error })
    }
}