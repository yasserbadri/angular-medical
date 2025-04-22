import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [LoginComponent, RegisterComponent] // facultatif si utilisé dans d'autres modules

})
export class AuthModule { }
