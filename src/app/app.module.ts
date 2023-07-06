import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NoopInterceptor } from './interceptors/noop.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForbiddenDirective } from './directives/forbidden.directive';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, // Template-driven form
    ReactiveFormsModule // Reactive forms
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
