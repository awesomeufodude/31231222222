import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SucursalesListComponent } from './components/sucursales-list/sucursales-list.component'

const routes: Routes = [
  { path: '', component: SucursalesListComponent },
  // { path: ':id', component: TerminalDetailComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SucursalesListComponent, // 📌 IMPORTA el Standalone Component en imports, no en declarationsx|x
  ],
})
export class SucursalesModule {}
