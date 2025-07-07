import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

export interface Sucursal {
  codigo: number
  comercio: string
  rut: string
  sucursal: number
  estado: string
  creacion: string
}

export interface SucursalFilter {
  rut?: string
  sucursal?: string
  estado?: string
}

@Injectable({ providedIn: 'root' })
export class SucursalesService {
 
  private readonly _data: Sucursal[] = [
    {
      codigo: 1000171,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 1,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000172,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 2,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000173,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 3,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000174,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 4,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000175,
      comercio: 'Comercial X SpA',
      rut: '77.713.704-2',
      sucursal: 5,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000176,
      comercio: 'Rodeo',
      rut: '77.713.704-2',
      sucursal: 6,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000177,
      comercio: 'Comercio Chile',
      rut: '77.713.704-2',
      sucursal: 7,
      estado: 'Inactivo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000178,
      comercio: 'Oxxo',
      rut: '77.713.704-2',
      sucursal: 8,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000179,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 9,
      estado: 'Inactivo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000180,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 10,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
  ]

  
  getSucursales(filter?: SucursalFilter): Observable<Sucursal[]> {
    let data = this._data

    if (filter) {
      if (filter.rut) {
        data = data.filter((s) => s.rut.includes(filter.rut!))
      }
      if (filter.sucursal) {
        data = data.filter((s) => String(s.sucursal).includes(filter.sucursal!))
      }
      if (filter.estado) {
        data = data.filter((s) => s.estado === filter.estado)
      }
    }
    return of(data).pipe(delay(300)) 
  }

  
  searchSucursales(filter$: Observable<SucursalFilter>, debounceMs = 300): Observable<Sucursal[]> {
    return filter$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((f) => {
        const clean: SucursalFilter = {}
        if (f.rut?.trim()) clean.rut = f.rut.trim()
        if (f.sucursal?.trim()) clean.sucursal = f.sucursal.trim()
        if (f.estado?.trim()) clean.estado = f.estado.trim()
        return this.getSucursales(clean)
      }),
    )
  }
}
