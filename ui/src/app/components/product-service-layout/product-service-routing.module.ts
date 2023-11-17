import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductServiceLayoutRoutingModule {}
