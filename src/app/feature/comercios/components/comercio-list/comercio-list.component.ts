import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NgClass } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { finalize } from 'rxjs/operators'

import {
  DataTableComponent,
  DataTableColumn,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { FilterTerminalComponent, ComercioFilter } from '../filter-terminal/filter-terminal.component'
import { AgregarComercioDialogComponent, DialogData } from '../agregar-comercio/agregar-comercio.component'
import { ComercioDetailDialogComponent } from '../comercio-detail/comercio-detail.component'
import { ComercioService, Comercio } from '../../../../core/services/comercios.service'
import { QueryParamSyncService } from '../../../../core/services/query-param-sync.service'

@Component({
  selector: 'app-comercio-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FilterTerminalComponent, DataTableComponent, DataTableCellDirective],
  templateUrl: './comercio-list.component.html',
  styleUrls: ['./comercio-list.component.scss'],
})
export class ComercioListComponent implements OnInit {
  columns: DataTableColumn<Comercio>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'nombre', header: 'Nombre', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'numero', header: 'Número', sortable: true },
    { key: 'seb', header: 'SEB', sortable: true },
    { key: 'tyc', header: 'T&C', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rowActions: RowAction<Comercio>[] = [{ id: 'view', icon: 'visibility', color: 'primary', tooltip: 'Ver detalle' }]

  filterForm: FormGroup
  allData: Comercio[] = []
  loading = false

  private qpSync = inject(QueryParamSyncService)
  private svc = inject(ComercioService)
  private dialog = inject(MatDialog)

  constructor(fb: FormBuilder) {
    this.filterForm = fb.group({
      name: [''],
      rut: [''],
      estado: [''],
    })
  }

  ngOnInit() {
    this.qpSync.readParams<Partial<ComercioFilter>>(['name', 'rut', 'estado']).subscribe((params) => {
      const has = Object.values(params).some((v) => v != null && v !== '')
      if (has) {
        this.filterForm.patchValue(params, { emitEvent: false })
        this.fetch(params as ComercioFilter)
      }
    })
  }

  onFilter(f: ComercioFilter) {
    this.filterForm.patchValue(f, { emitEvent: false })
    this.qpSync.updateParams(f)
    this.fetch(f)
  }

  private fetch(f: ComercioFilter) {
    const { name, rut, estado } = f
    if (!(name || rut || estado)) {
      this.allData = []
      return
    }
    this.loading = true
    this.svc
      .getComercioes(f)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((rows) => (this.allData = rows))
  }

  handleAction(e: RowActionEvent<Comercio>) {
    if (e.action === 'view') {
      this.dialog.open(ComercioDetailDialogComponent, {
        width: '800px',
        data: e.row,
      })
    }
  }

  onAdd() {
    const data: Omit<DialogData, 'rows'> = {
      name: '',
      rut: '',
      estado: '',
      estados: ['Activo', 'Inactivo', 'Suspendido'],
    }
    this.dialog.open(AgregarComercioDialogComponent, {
      width: '1000px',
      panelClass: 'app-dialog-container',
      data,
      disableClose: true,
    })
  }
}
