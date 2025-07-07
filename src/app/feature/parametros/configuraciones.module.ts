import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesListComponent } from './components/configuraciones-list/configuraciones-list.component';

const routes: Routes = [
  { path: '', component: ConfiguracionesListComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConfiguracionesListComponent, 
  ]
})
export class ParametrosModule {}