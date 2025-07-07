import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

export interface Terminal {
  codigo: number
  comercio: string
  rut: string
  sucursal: number
  terminal: number
  estado: string
  creacion: string
}

export interface TerminalFilter {
  rut?: string
  terminal?: string
  estado?: string
}

@Injectable({ providedIn: 'root' })
export class TerminalesService {
 
  private readonly _mock: Terminal[] = [
    {
      codigo: 1000171,
      comercio: 'Comercial Ilimitada SpA',
      rut: '77.713.704-2',
      sucursal: 1,
      terminal: 1,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000172,
      comercio: 'Comercial Chile',
      rut: '77.713.704-2',
      sucursal: 2,
      terminal: 2,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000173,
      comercio: 'Comercial Francia',
      rut: '77.713.704-2',
      sucursal: 3,
      terminal: 3,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000174,
      comercio: 'Oxxo',
      rut: '77.713.704-2',
      sucursal: 4,
      terminal: 4,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000175,
      comercio: 'Oxxo',
      rut: '77.713.704-2',
      sucursal: 5,
      terminal: 5,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000176,
      comercio: 'Ok Market',
      rut: '77.713.704-2',
      sucursal: 6,
      terminal: 6,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000177,
      comercio: 'Comercial Maihue SpA',
      rut: '77.713.704-2',
      sucursal: 7,
      terminal: 7,
      estado: 'Inactivo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000178,
      comercio: 'Comercial Maihue SpA',
      rut: '77.713.704-2',
      sucursal: 8,
      terminal: 8,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000179,
      comercio: 'Comercial Maihue SpA',
      rut: '77.713.704-2',
      sucursal: 9,
      terminal: 9,
      estado: 'Inactivo',
      creacion: '15-08-2020 15:30:58',
    },
    {
      codigo: 1000180,
      comercio: 'Comercial Maihue SpA',
      rut: '77.713.704-2',
      sucursal: 19,
      terminal: 10,
      estado: 'Activo',
      creacion: '15-08-2020 15:30:58',
    },
  ]

  getTerminales(filter?: TerminalFilter): Observable<Terminal[]> {
    let data = this._mock

    if (filter) {
      if (filter.rut) {
        data = data.filter((t) => t.rut.includes(filter.rut!))
      }
      if (filter.terminal) {
        data = data.filter((t) => String(t.terminal).includes(filter.terminal!))
      }
      if (filter.estado) {
        data = data.filter((t) => t.estado === filter.estado)
      }
    }

    return of(data).pipe(delay(300))
  }

  searchTerminales(filter$: Observable<TerminalFilter>, debounceMs = 300): Observable<Terminal[]> {
    return filter$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((f) => this.getTerminales(f)),
    )
  }
}
