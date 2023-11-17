import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { AntDesignModule } from './ant-design/ant-design.module';
import { ProductServiceLayoutRoutingModule } from '../components/product-service-layout/product-service-routing.module';

@NgModule({
  declarations: [],
  imports: [AntDesignModule, ProductServiceLayoutRoutingModule],
  exports: [AntDesignModule],
})
export class SharedModule {}
