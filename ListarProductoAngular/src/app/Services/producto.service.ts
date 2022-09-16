import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:3000/api';
  constructor(private http: HttpClient) { }


  //get productos
  getProductos()
  {
    return this.http.get(this.url);
  }


  //get un producto
  getProducto(id:string){
    return this.http.get(this.url+'/'+id);
  }


  //agregar producto
  addProducto(producto:Producto)
  {
    return this.http.post(this.url, producto);
  }


  //eliminar
  deleteProducto(id:number){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar producto
  editProducto(id:string, producto:Producto){
    return this.http.put(this.url+'/'+id, producto);
  }

}


export interface Producto{
  id?:string;
  nombre?:string;
  descripcion?:string;
  precio?:string;
}
