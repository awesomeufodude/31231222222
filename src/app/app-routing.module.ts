import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { BackofficeLayoutComponent } from './core/backoffice-layout/backoffice-layout.component'

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./feature/login/login.module').then((m) => m.LoginModule) },
  {
    path: '',
    component: BackofficeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./feature/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'terminales',
        loadChildren: () => import('./feature/terminales/terminales.module').then((m) => m.TerminalesModule),
      },
      {
        path: 'sucursales',
        loadChildren: () => import('./feature/sucursales/sucursales.module').then((m) => m.SucursalesModule),
      },
      {
        path: 'comercios',
        loadChildren: () => import('./feature/comercios/comercios.module').then((m) => m.ComerciosModule),
      },
      {
        path: 'parametros',
        loadChildren: () => import('./feature/parametros/configuraciones.module').then((m) => m.ParametrosModule),
      },
      {
        path: 'historial',
        loadChildren: () => import('./feature/historial/historial.module').then((m) => m.HistorialModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./feature/usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
    ],
    //loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
