import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutComponent } from './components/about/about.component';
import { FAQComponent } from './components/faq/faq.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ProductServiceLayoutComponent } from './components/product-service-layout/product-service-layout.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'faq',
    component: FAQComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'info',
    component: ProductServiceLayoutComponent,
    loadChildren: () =>
      import(
        './components/product-service-layout/product-service-layout.module'
      ).then((m) => m.ProductServiceLayoutModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
