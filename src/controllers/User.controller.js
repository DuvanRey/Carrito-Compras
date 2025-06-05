import { User } from "../models/User.js"
import { UserAdministrador } from "../models/UserAdministrador.js"
import { UserCliente } from "../models/UserCliente.js"
import { hashSync } from "bcrypt";


export const createUsersAdmin = async (req, res) => {
    try {
        const body = req.body
       const usuario = await User.create({
            tipo: 2,
            estado: body.estado,
            telefono: body.telefono,
            correo: body.correo,
            password: hashSync(body.password, 10),
            actualizarPassword: 1,
            createdBy: req.user.id,
            updatedBy: req.user.id
        });

        const admin = await UserAdministrador.create({
            idUser: usuario.id,
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            fechaIngreso: body.fechaIngreso,
            createdBy: req.user.id,
            updatedBy: req.user.id
        });
        return res.status(200).json({ message: 'Usuario creado correctamente', data: true })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'error al consultar', error })
    }
}

export const updateUsersAdmin = async (req, res) => {
    const { idUserAdmin } = req.params;
    const body = req.body;

    try {
        const admin = await UserAdministrador.findByPk(idUserAdmin);
        if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });

        await admin.update({
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            fechaIngreso: body.fechaIngreso,
            updatedBy: req.user.id
        });

        const user = await User.findByPk(admin.idUser);
        if (!user) return res.status(404).json({ message: 'Usuario base no encontrado' });

        await user.update({
            estado: body.estado,
            telefono: body.telefono,
            correo: body.correo,
            password: body.password ? hashSync(body.password, 10) : user.password,
            actualizarPassword: body.actualizarPassword,
            updatedBy: req.user.id
        });

        return res.status(200).json({ message: 'Guardado correctamente', data: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al actualizar', error });
    }
};

export const getUsersAdminById = async (req, res) => {
    const { idUserAdmin } = req.params;
    try {
        const data = await UserAdministrador.findOne({
            where: { id: idUserAdmin },
            include: [{
                model: User,
                as: 'user',
                attributes: ['estado', 'telefono', 'correo', 'actualizarPassword'],
                where: { id: req.user.id }
            }]
        });

        if (!data) return res.status(404).json({ message: 'No se encontró el administrador' });

        return res.status(200).json({ message: 'Consulta exitosa', data });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al obtener datos', error });
    }
};

export const getUsersAdmin = async (req, res) => {
    try {
        const data = await UserAdministrador.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['estado', 'telefono', 'correo']
            }]
        });

        return res.status(200).json({ message: 'Consulta exitosa', data });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al obtener administradores', error });
    }
};

export const registerUserClient = async (req, res) => {
    const body = req.body;
    try {
        const user = await User.create({
            tipo: 3,
            estado: 1,
            telefono: body.telefono,
            correo: body.correo,
            password: hashSync(body.password, 10),
            actualizarPassword: 0
        });

        await UserCliente.create({
            idUser: user.id,
            direccion: body.direccion,
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            createdBy: req.user.id,
            updatedBy: req.user.id
        });

        return res.status(200).json({ message: 'Cliente registrado correctamente', data: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al registrar cliente', error });
    }
};

export const getUserClient = async (req, res) => {
    try {
        const data = await UserCliente.findOne({
            include: [{
                model: User,
                as: 'user',
                attributes: ['estado', 'telefono', 'correo']
            }]
        });

        if (!data) return res.status(404).json({ message: 'Cliente no encontrado' });

        return res.status(200).json({ message: 'Consulta exitosa', data });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al obtener cliente', error });
    }
};
