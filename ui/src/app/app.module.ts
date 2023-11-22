import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { register } from 'swiper/element/bundle';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AutoSlideLogoComponent } from './components/home/auto-slide-logo/auto-slide-logo.component';
import { TextSliderComponent } from './components/home/text-slider/text-slider.component';
import { ContactFormComponent } from './shared/layout/footer/contact-form/contact-form.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutComponent } from './components/about/about.component';
import { FAQComponent } from './components/faq/faq.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { CareersComponent } from './components/careers/careers.component';

register();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AutoSlideLogoComponent,
    TextSliderComponent,
    ContactFormComponent,
    PricingComponent,
    AboutComponent,
    FAQComponent,
    ResourcesComponent,
    CareersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    SharedModule,
    RecaptchaFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
