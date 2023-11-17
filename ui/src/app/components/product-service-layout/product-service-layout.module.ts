import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ProductServiceLayoutRoutingModule } from './product-service-routing.module';
import { ProductServiceLayoutComponent } from './product-service-layout.component';
import { ProductsComponent } from './products/products.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './services/services.component';
@NgModule({
  declarations: [
    ProductServiceLayoutComponent,
    ProductsComponent,
    ServicesComponent,
    CardComponent,
    SearchBarComponent,
  ],
  imports: [CommonModule, SharedModule, ProductServiceLayoutRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProductServiceLayoutModule {}
