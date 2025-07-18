import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComercioListComponent } from './components/comercio-list/comercio-list.component'

const routes: Routes = [{ path: '', component: ComercioListComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComercioListComponent,
  ],
})
export class ComerciosModule {}