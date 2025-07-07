import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

export interface Configuracion {
  configuracion: string
  valor: string | number
}

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionesService {
  private readonly _mock: Configuracion[] = [
    {
      configuracion: 'Monto máximo diario para giros por RUT',
      valor: '$250.000',
    },
    {
      configuracion: 'Monto máximo diario para depósitos por RUT',
      valor: '$250.000',
    },
    {
      configuracion: 'Cantidad máxima diaria de depósitos por RUT',
      valor: 3,
    },
    {
      configuracion: 'Cantidad de onboardings por día',
      valor: 100,
    },
  ]

  getConfiguraciones(): Observable<Configuracion[]> {
    return of(this._mock).pipe(delay(300))
  }
}
