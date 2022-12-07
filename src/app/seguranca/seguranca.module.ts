import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {PasswordModule} from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca-routing.module';



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
    SegurancaRoutingModule
  ]
})
export class SegurancaModule { }
