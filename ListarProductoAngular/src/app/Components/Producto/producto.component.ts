import { Component, OnInit } from '@angular/core';
import {ProductoService, Producto} from '../../Services/producto.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  //varibale
  productos: Producto[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: number = 0;
  filterProductos: Producto[] = [];

  constructor(private ProductoService:ProductoService, private router:Router) { }

  ngOnInit(): void {
    this.ListarProductos();
  }


  ListarProductos()
  {
    this.ProductoService.getProductos().subscribe(
      res=>{
        console.log(res);
        this.productos=<any>res;
        this.collectionSize = this.productos.length;
        this.filterProductos = this.productos;
        this.ActualizarProductos();
      },
      err => console.log(err)
    );
  }

  
  Eliminar(item: any)
  {
    this.ProductoService.deleteProducto(item.id).subscribe(
      res=>{
        console.log('equipo eliminado');
        this.ListarProductos();
      },
      err=> console.log(err)
      );
  }

  ActualizarProductos() {
    this.filterProductos = this.productos
      .map((producto: any, index: number) => ({id: index + 1, ...producto}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
