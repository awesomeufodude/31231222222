import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'

import { CommonModule, NgIf, NgFor } from '@angular/common'

import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { RadioButtonComponent } from '../../../../core/components/radio-button/radio-button.component'
import { QueryParamSyncService } from '../../../../core/services/query-param-sync.service'
import { HistorialFilter } from '../../../../core/services/historial.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatRadioModule } from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

@Component({
  selector: 'app-filter-terminal',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SelectFieldComponent,
    ButtonComponent,
    RadioButtonComponent,
  ],
  templateUrl: './filter-terminal.component.html',
  styleUrls: ['./filter-terminal.component.scss'],
})
export class FilterTerminalComponent {
  
  @Output() filterChange = new EventEmitter<HistorialFilter>()

  @Output() download = new EventEmitter<HistorialFilter>()

  form: FormGroup
  acciones = ['Creación', 'Modificación', 'Actualización', 'Inicio de sesión', 'Cierre de sesión']
  objetos = ['Comercio', 'Usuario', 'Terminal', 'Sucursal']

  constructor(private fb: FormBuilder, private qpSync: QueryParamSyncService) {
 
    this.form = this.fb.group({
      tipoAccion: new FormControl(''),
      objeto: new FormControl(''),
      dateFilterType: new FormControl<'today' | 'historical'>('today'),
      fromDate: new FormControl<Date | null>(null),
      toDate: new FormControl<Date | null>(null),
    })

   
    this.qpSync
      .readParams<HistorialFilter & { dateFilterType?: string }>(['tipoAccion', 'objeto', 'fromDate', 'toDate'])
      .subscribe((p) => {
        if (p.fromDate) p.fromDate = new Date(p.fromDate)
        if (p.toDate) p.toDate = new Date(p.toDate)
        this.form.patchValue(p, { emitEvent: false })
      })
  }

  get isHistorical(): boolean {
    return this.form.get('dateFilterType')?.value === 'historical'
  }

 
  onRefresh(): void {
    this.emitFilter()
  }
  onSearch(): void {
    this.emitFilter()
  }

  onClear(): void {
    this.form.reset({
      tipoAccion: '',
      objeto: '',
      dateFilterType: 'today',
      fromDate: null,
      toDate: null,
    })
    this.emitFilter() 
  }

 
  onDownload(): void {
    const f = this.buildFilter()
    this.download.emit(f) 
  }


  private emitFilter(): void {
    const f = this.buildFilter()

    this.qpSync.updateParams({
      ...f,
      fromDate: f.fromDate ? f.fromDate.toISOString() : undefined,
      toDate: f.toDate ? f.toDate.toISOString() : undefined,
    })

    this.filterChange.emit(f)
  }

  private buildFilter(): HistorialFilter {
    const raw = this.form.value
    return {
      tipoAccion: raw.tipoAccion || undefined,
      objeto: raw.objeto || undefined,
      fromDate: this.isHistorical ? raw.fromDate || undefined : undefined,
      toDate: this.isHistorical ? raw.toDate || undefined : undefined,
    }
  }
}
