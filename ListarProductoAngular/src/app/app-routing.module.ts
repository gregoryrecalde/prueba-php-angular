import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './Components/Producto/producto.component';

const routes: Routes = [
  { path:'', redirectTo:'/productos', pathMatch:'full'},
  {path:'productos' , component: ProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
