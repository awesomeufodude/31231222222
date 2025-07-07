// src/app/feature/sucursales/sucursales-list.component.ts
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
import { FilterTerminalComponent, SucursalFilter } from '../filter-terminal/filter-terminal.component'
import { SucursalesDetailDialogComponent } from '../sucursales-detail/sucursales-detail.component'
import { AgregarSucursalesDialogComponent, DialogData } from '../agregar-sucursales/agregar-sucursales.component'
import { Sucursal, SucursalesService } from '../../../../core/services/sucursales.service'
import { QueryParamSyncService } from '../../../../core/services/query-param-sync.service'

@Component({
  selector: 'app-sucursales-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FilterTerminalComponent, DataTableComponent, DataTableCellDirective],
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.scss'],
})
export class SucursalesListComponent implements OnInit {
  columns: DataTableColumn<Sucursal>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'comercio', header: 'Comercio', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'sucursal', header: 'Nº sucursal', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rowActions: RowAction<Sucursal>[] = [{ id: 'view', icon: 'visibility', color: 'primary', tooltip: 'Ver detalle' }]

  filterForm: FormGroup
  allData: Sucursal[] = []
  loading = false

  private qpSync = inject(QueryParamSyncService)
  private svc = inject(SucursalesService)
  private dialog = inject(MatDialog)

  constructor(fb: FormBuilder) {
    this.filterForm = fb.group({
      rut: [''],
      sucursal: [''],
      estado: [''],
    })
  }

  ngOnInit() {
    this.qpSync.readParams<Partial<SucursalFilter>>(['rut', 'sucursal', 'estado']).subscribe((params) => {
      const has = Object.values(params).some((v) => v != null && v !== '')
      if (has) {
        this.filterForm.patchValue(params, { emitEvent: false })
        this.fetch(params as SucursalFilter)
      }
    })
  }

  onFilter(f: SucursalFilter) {
    this.filterForm.patchValue(f, { emitEvent: false })
    this.qpSync.updateParams(f)
    this.fetch(f)
  }

  private fetch(f: SucursalFilter) {
    const { rut, sucursal, estado } = f
    if (!(rut || sucursal || estado)) {
      this.allData = []
      return
    }
    this.loading = true
    this.svc
      .getSucursales(f)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((rows) => (this.allData = rows))
  }

  handleAction(e: RowActionEvent<Sucursal>) {
    if (e.action === 'view') {
      this.dialog.open(SucursalesDetailDialogComponent, {
        width: '800px',
        data: e.row,
      })
    }
  }

  onAdd(filter: SucursalFilter) {
    this.dialog.open(AgregarSucursalesDialogComponent, {
      width: '1000px',
      data: filter, 
      disableClose: true,
    })
  }
}
