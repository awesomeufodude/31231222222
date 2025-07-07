import { Injectable } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs'
import { map, first } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class QueryParamSyncService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  readParams<T extends object>(keys: (keyof T)[]): Observable<Partial<T>> {
    return this.route.queryParamMap.pipe(
      map((qp: ParamMap) => {
        const out = {} as Partial<T>
        for (const k of keys) {
          const v = qp.get(k as string)
          if (v !== null && v !== '') {
            // @ts-ignore
            out[k] = v
          }
        }
        return out
      }),
      first(),
    )
  }

  updateParams<T extends object>(params: Partial<T>): void {
    const cleaned: any = {}
    for (const [k, v] of Object.entries(params)) {
      cleaned[k] = v != null && v !== '' ? v : null
    }
    this.router.navigate([], {
      queryParams: cleaned,
      queryParamsHandling: 'merge',
    })
  }
}
