const subCategoria = require('../models/subcategoria.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "contenido no puede estar vacio!"
        });
    }
    const subcategoria = new subCategoria({
        cod_categoria: req.body.cod_categoria,
        cod_sub_categoria: req.body.cod_sub_categoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha_creacion: req.body.fecha_creacion,
    });
    subCategoria.create(subcategoria, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "han ocurrido algunos errores creando el producto."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    subCategoria.getAll(req.params.cod_categoria,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products"
            });
        else res.send(data);
    });
};
exports.findOne = (req, res) => {
    subCategoria.findById(req.params.cod_sub_categoria, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `not found subCategoria with id ${req.params.cod_sub_categoria}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al recuperar el producto con id" + req.params.cod_sub_categoria
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    subCategoria.remove(req.params.cod_sub_categoria, (err, data) => {
        if (err) {
            if (err.kind == "no econtrado") {
                res.status(404).send({
                    message: `Not found subcategoria WITH Codsucategoria ${req.params.cod_sub_categoria}`
                });
            } else {
                res.status(509).send({
                    message: "No se pudo eliminar el cliente codigo: " + req.params.cod_sub_categoria
                });
            }
        } else res.send({ message: `Producto elimnado satisfactoriamente!` });
    });
};


