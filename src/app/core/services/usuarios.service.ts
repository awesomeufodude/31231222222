import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

export interface Usuario {
  nombre: string
  correo: string
  id: string
  rol: string
  estado: string
}

export interface UsuarioFilter {
  name?: string 
  correo?: string
  rol?: string
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly _mock: Usuario[] = [
    { nombre: 'José Ignacio Mora', correo: 'jose.mora@santander.com', id: '32308', rol: 'Auditor', estado: 'Activo' },
    { nombre: 'María Pérez López', correo: 'maria.perez@banco.com', id: '56478', rol: 'Usuario', estado: 'Activo' },
    { nombre: 'Luis Gómez Ruiz', correo: 'luis.gomez@banco.com', id: '58940', rol: 'Auditor', estado: 'Activo' },
    { nombre: 'Ana Fernández Díaz', correo: 'ana.fernandez@banco.com', id: '57483', rol: 'Auditor', estado: 'Activo' },
    { nombre: 'Carla Domínguez Soto', correo: 'carla.dom@santander.cl', id: '59402', rol: 'Auditor', estado: 'Activo' },
    { nombre: 'Pedro Torres Méndez', correo: 'pedro.torres@banco.cl', id: '10394', rol: 'Auditor', estado: 'Activo' },
    {
      nombre: 'Laura Castillo Ríos',
      correo: 'laura.castillo@banco.cl',
      id: '54920',
      rol: 'Auditor',
      estado: 'Inactivo',
    },
    { nombre: 'Sofía Vargas Peña', correo: 'sofia.vargas@banco.cl', id: '49503', rol: 'Auditor', estado: 'Activo' },
    {
      nombre: 'Diego Morales Silva',
      correo: 'diego.morales@banco.cl',
      id: '30938',
      rol: 'Auditor',
      estado: 'Inactivo',
    },
    {
      nombre: 'Valentina Cruz Herrera',
      correo: 'valentina.cruz@banco.cl',
      id: '30496',
      rol: 'Auditor',
      estado: 'Activo',
    },
  ]

  getUsuarios(filter?: UsuarioFilter): Observable<Usuario[]> {
    let data = this._mock

    if (filter) {
      if (filter.name) {
        const n = filter.name.toLowerCase()
        data = data.filter((u) => u.nombre.toLowerCase().includes(n))
      }
      if (filter.correo) {
        const c = filter.correo.toLowerCase()
        data = data.filter((u) => u.correo.toLowerCase().includes(c))
      }
      if (filter.rol) {
        data = data.filter((u) => u.rol === filter.rol)
      }
    }

    return of(data).pipe(delay(300))
  }
}
