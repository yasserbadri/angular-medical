import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Ajoute cette ligne




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, FormsModule,    ReactiveFormsModule // <-- Ajoute cette ligne

  ],
  exports: [LoginComponent, RegisterComponent] // facultatif si utilisé dans d'autres modules

})
export class AuthModule { }
