import { User } from '../models/User.js';
import { UserAdministrador } from '../models/UserAdministrador.js';
import { Tienda } from '../models/Tienda.js';
import { uploadFile } from '../utils/storage.js';
import { hashSync } from "bcrypt";


export const crearTienda = async (req, res) => {
    try {
        const body = req.body;
        const file = req.files;

        // Crear usuario
        const user = await User.create({
            tipo: 2,
            estado: 1,
            telefono: body.telefonoAdministrador,
            correo: body.correo,
            password: hashSync('123456', 10),
            actualizarPassword: 1,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });

        // Crear administrador
        const userAdmin = await UserAdministrador.create({
            idUser: user.id,
            estado: 1,
            nombre: body.nombreAdministrador,
            apellido: body.apellidoAdministrador,
            fechaNacimiento: body.fechaNacimiento,
            fechaIngreso: body.fechaIngreso,
            direccion: body.direccion,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });

        // Subir imagen
        let imagenTienda = null;
        if (file?.foto) {
            imagenTienda = await uploadFile(file.foto, 'carrito/tiendas');
        }
        console.log("🚀 ~ crearTienda ~ imagenTienda:", imagenTienda)

        // Crear tienda
        const tienda = await Tienda.create({
            idUserAdministrador: userAdmin.id,
            nombre: body.nombre,
            descripcion: body.descripcion,
            foto: imagenTienda?.url,
            fotoMini: imagenTienda?.url,
            telefono: body.telefono,
            direccion: body.direccion,
            apertura: 1,
            estado: 1,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });


        return res.status(200).json({ message: 'Tienda guardada con éxito', data: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al crear tienda', error });
    }
};

export const listarTiendas = async (req, res) => {
    try {
       const tiendas =  await Tienda.findAll({
            attributes: [
                'id',
                'foto',
                'nombre',
                'direccion',
                'idUserAdministrador',
                'estado'
            ],
            raw: true
        });

        for (const tienda of tiendas) {
            const admin = await UserAdministrador.findByPk(tienda.idUserAdministrador)
            tienda.administrador = admin.nombre
        }
       return res.status(200).json({ message: 'Tienda guardada con éxito', data: tiendas})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al crear tienda', error });
    }
};
