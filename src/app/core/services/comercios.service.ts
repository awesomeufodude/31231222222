import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

export interface Comercio {
  codigo: number
  nombre: string
  rut: string
  numero: number
  seb: string
  tyc: string
  estado: string
  creacion: string
}

export interface ComercioFilter {
  name?: string
  rut?: string
  estado?: string
}

@Injectable({ providedIn: 'root' })
export class ComercioService {
  private _mock: Comercio[] = [
    {
      codigo: 1000171,
      nombre: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      numero: 50,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000172,
      nombre: 'Comercial AB SpA',
      rut: '77.713.704-2',
      numero: 51,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000173,
      nombre: 'Comercial IT SpA',
      rut: '77.713.704-2',
      numero: 52,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000174,
      nombre: 'Comercial FF SpA',
      rut: '77.713.704-2',
      numero: 53,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000175,
      nombre: 'Comercial Austral SpA',
      rut: '77.713.704-2',
      numero: 54,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000176,
      nombre: 'Empresas Sol SpA',
      rut: '77.713.704-2',
      numero: 55,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000177,
      nombre: 'Hermanos Jara SpA',
      rut: '77.713.704-2',
      numero: 56,
      seb: 'Si',
      tyc: 'Si',
      estado: 'Inactivo',
      creacion: '15-08-2020 15:30:58',
    },
  ]

  getComercioes(filter?: ComercioFilter): Observable<Comercio[]> {
    let data = this._mock
    if (filter) {
      if (filter.name) data = data.filter((c) => c.nombre.toLowerCase().includes(filter.name!.toLowerCase()))
      if (filter.rut) data = data.filter((c) => c.rut.includes(filter.rut!))
      if (filter.estado) data = data.filter((c) => c.estado === filter.estado)
    }
    return of(data).pipe(delay(300))
  }
}

