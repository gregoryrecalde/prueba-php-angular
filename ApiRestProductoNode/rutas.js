const rutas = require('express').Router()
const { Router } = require('express');
const conexion = require('./config/conexion')

//asignamos todas las rutas
rutas.get('/', (req, res) => {
    let sql = 'select * from producto'
    conexion.query(sql,(err, rows, fields) => {
        if(err) throw err;
        else {
            res.json(rows)
        }
    })
});

rutas.get('/:id', (req, res) => {
    const {id} = req.params
    let sql = 'select * from producto where id = ?'
    conexion.query(sql,[id],(err, rows, fields) => {
        if(err) throw err;
        else {
            res.json(rows)
        }
    })
});

rutas.post('/', (req, res) => {
    const{nombre, descripcion, precio} = req.body.producto;
    let sql = `insert into producto(nombre,descripcion,precio) values ('${nombre}','${descripcion}','${precio}')`;
    conexion.query(sql, (err, rows, fields) => {
        
        if(err) {
            if(err.errno=1062)
            {
                res.json({status: 'producto existente'});
            }
        }
        else {
            res.json({status: 'producto agregado',insertId:rows.insertId});
        }
        
    })
});


rutas.delete('/:id', (req, res) => {
    const {id} = req.params
    let sql = 'delete from producto where id = ?'
    conexion.query(sql,[id],(err, rows, fields) => {
        if(err) throw err;
        else {
            res.json({status: 'producto eliminado'})
        }
    })
});

rutas.put('/:id',(req,res)=>{
    const{id}=req.params
    const{nombre, descripcion, precio} = req.body
    let sql = `update producto set
                nombre = '${nombre}',
                descripcion = '${descripcion}',
                precio = '${precio}' 
                where id = '${id}'`
    conexion.query(sql,[id],(err, rows, fields) => {
        if(err) throw err;
        else {
            res.json({status: 'producto modificado'})
        }
    })
})


module.exports = rutas;