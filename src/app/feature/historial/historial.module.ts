import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistorialListComponent } from './components/historial-list/historial-list.component';


const routes: Routes = [{ path: '', component: HistorialListComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HistorialListComponent, 
  ],
})
export class HistorialModule {}