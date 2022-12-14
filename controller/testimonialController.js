
import {Testimonial} from '../model/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //validar..
    const { nombre,correo,mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'el Nombre esta vacio'});
    }
    if (correo.trim() === '') {
        errores.push({mensaje: 'el Correo esta vacio'});
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje: 'el Mensaje esta vacio'});
    }

    if (errores.length > 0) {

        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores 
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores ,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenar la informacion en la base de datos 

        try {
            await Testimonial.create({
                nombre,
                correo,                
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }


}

export {
    guardarTestimonial
}