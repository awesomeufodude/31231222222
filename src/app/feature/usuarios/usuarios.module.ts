import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';


const routes: Routes = [{ path: '', component: UsuariosListComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UsuariosListComponent,
  ],
})
export class UsuariosModule {}