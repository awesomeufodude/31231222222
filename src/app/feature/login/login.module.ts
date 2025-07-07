import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    LoginComponent,
    RouterModule.forChild(routes)
  ],
})
export class LoginModule {}