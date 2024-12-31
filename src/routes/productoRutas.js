const express = require('express');
const routes = express.Router();
const Producto = require('../models/Producto');

//crear un producto
routes.post('/', async(req, res)=>{
    try{
        const producto =new Producto(req.body);
        await producto.save();
        res.status(200).json({message: 'Producto creado', producto });
    } catch(error){
        res.status(500).json({error: 'Error al crear el producto', detalle: error.message});
    }
});

//Leer todos los productos
routes.get('/', async(req, res)=>{
    try{
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch(error){
        res.status(500).json({error: 'Error al obtener los productos', detalle: error.message});
    }
});

//leer un producto por ID
routes.get('/:id', async(req, res)=>{
    try{
        const producto = await Producto.findById(req.params.id);
        if(!producto) return res.status(404).json({error: 'Producto no encontrado'});
        res.status(200).json(producto);
    } catch(error){
        res.status(500).json({error: 'Error al obtener el producto', detalle: error.message});
    }
});

//actualizar un producto por ID
routes.put('/:id', async(req, res)=>{
    try{
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!productoActualizado) return res.status(404).json({error: 'Producto no encontrado'});
        res.status(200).json({message: 'Producto actualizado', productoActualizado});
    } catch(error){
        res.status(500).json({error: 'Error al actualizar el producto', detalle: error.message});
    }
});

//eliminar un producto por ID
routes.delete('/:id', async(req, res)=>{
    try{
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if(!productoEliminado) return res.status(404).json({error: 'Producto no encontrado'});
        res.status(200).json({message: 'Producto eliminado', productoEliminado});
    } catch(error){
        res.status(500).json({error: 'Error al eliminar el producto', detalle: error.message});
    }
});

module.exports = routes;