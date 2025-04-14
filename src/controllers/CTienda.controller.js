import { Tienda } from "../models/Tienda.js"

export const alistarTiendas = async (req, res) => {
    try {
        const alistarTiendas = await Tienda.findAll({
            attributes: [
                'nombre',
                'descripcion',
                'foto',
                'telefono',
                'direccion',
                'apertura'
            ],

        })
        return res.status(200).json({ message: 'Tienda obtenida con exito', data: alistarTiendas })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al obtener Tienda', error })
    }
}

