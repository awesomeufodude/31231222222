import { Component, OnInit } from '@angular/core'
import { NgClass } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'

import {
  DataTableComponent,
  DataTableColumn,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { ConfiguracionesDetailDialogComponent } from '../configuraciones-detail/configuraciones-detail.component'
import { Configuracion, ConfiguracionesService } from '../../../../core/services/configuraciones.service'
import { finalize } from 'rxjs'

@Component({
  selector: 'app-configuraciones-list',
  standalone: true,
  imports: [NgClass, DataTableComponent, DataTableCellDirective],
  templateUrl: './configuraciones-list.component.html',
  styleUrls: ['./configuraciones-list.component.scss'],
})
export class ConfiguracionesListComponent implements OnInit {
  
  columns: DataTableColumn<Configuracion>[] = [
    { key: 'configuracion', header: 'Configuración', sortable: true },
    { key: 'valor', header: 'Valor', sortable: false },
  ]

  rowActions: RowAction<Configuracion>[] = [{ id: 'view', icon: 'visibility', tooltip: 'Ver detalle' }]

  allData: Configuracion[] = []
  loading = false

  constructor(private dialog: MatDialog, private svc: ConfiguracionesService) {}

  ngOnInit() {
    this.loading = true
    this.svc
      .getConfiguraciones()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.allData = data))
  }

  /** Opens the detail dialog when the “eye” button is clicked */
  handleAction(e: RowActionEvent<Configuracion>) {
    if (e.action === 'view') {
      this.dialog.open(ConfiguracionesDetailDialogComponent, {
        width: '600px',
        data: e.row,
      })
    }
  }
}
