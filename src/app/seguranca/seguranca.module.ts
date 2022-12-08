import { MoneyHttpInterceptor } from './money-http-interceptor';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {PasswordModule} from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



export function tokenGetter(): string {

  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,

    FormsModule,
    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    }
  ]
})
export class SegurancaModule { }
