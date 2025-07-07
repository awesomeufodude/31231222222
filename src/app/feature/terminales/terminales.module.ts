import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TerminalListComponent } from './components/terminal-list/terminal-list.component';

const routes: Routes = [
  { path: '', component: TerminalListComponent },
  // { path: ':id', component: TerminalDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TerminalListComponent, // 📌 IMPORTA el Standalone Component en imports, no en declarationsx|x
  ],
})
export class TerminalesModule {}