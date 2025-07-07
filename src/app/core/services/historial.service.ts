import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

export interface Historial {
  codigo: string
  tipoAccion: string
  objeto: string
  usuario: string
  actualizacion: string 
  json: string
}

export interface HistorialFilter {
  tipoAccion?: string
  objeto?: string
  fromDate?: Date
  toDate?: Date
}

@Injectable({ providedIn: 'root' })
export class HistorialService {
 
  private readonly _mock: Historial[] = [
    {
      codigo: '003500d4551',
      tipoAccion: 'Creación',
      objeto: 'Usuario',
      usuario: '12345678-5',
      actualizacion: '15-08-2020 15:30:58',
      json: `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": { "GlossEntry": { "ID": "SGML" } }
    }
  }
}`,
    },
    {
      codigo: '003500d4523',
      tipoAccion: 'Modificación',
      objeto: 'Usuario',
      usuario: '12345678-5',
      actualizacion: '15-08-2020 15:30:58',
      json: `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": { "GlossEntry": { "ID": "SGML" } }
    }
  }
}`,
    },
    {
      codigo: '003500d4533',
      tipoAccion: 'Actualización',
      objeto: 'Usuario',
      usuario: '12345678-5',
      actualizacion: '15-08-2020 15:30:58',
      json: `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": { "GlossEntry": { "ID": "SGML" } }
    }
  }
}`,
    },
    {
      codigo: '003500d4553',
      tipoAccion: 'Inicio de sesión',
      objeto: 'Usuario',
      usuario: '12345678-5',
      actualizacion: '15-08-2020 15:30:58',
      json: `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": { "GlossEntry": { "ID": "SGML" } }
    }
  }
}`,
    },
    {
      codigo: '003500d4553',
      tipoAccion: 'Cierre de sesión',
      objeto: 'Usuario',
      usuario: '12345678-5',
      actualizacion: '15-08-2020 15:30:58',
      json: `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": { "GlossEntry": { "ID": "SGML" } }
    }
  }
}`,
    },
  ]

  
  private parseDate(str: string): Date {
    const [d, m, y, h, i, s] = str.replace(/[- :]/g, ',').split(',').map(Number)
    return new Date(y, m - 1, d, h, i, s)
  }

  getHistorial(filter?: HistorialFilter): Observable<Historial[]> {
    let data = this._mock

    if (filter) {
      if (filter.tipoAccion) {
        data = data.filter((h) => h.tipoAccion === filter.tipoAccion)
      }
      if (filter.objeto) {
        data = data.filter((h) => h.objeto === filter.objeto)
      }
      if (filter.fromDate) {
        data = data.filter((h) => this.parseDate(h.actualizacion) >= filter.fromDate!)
      }
      if (filter.toDate) {
        data = data.filter((h) => this.parseDate(h.actualizacion) <= filter.toDate!)
      }
    }

    return of(data).pipe(delay(300))
  }

  searchHistorial(filter$: Observable<HistorialFilter>, debounceMs = 300): Observable<Historial[]> {
    return filter$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((f) => this.getHistorial(f)),
    )
  }
}
