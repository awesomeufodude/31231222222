import { Component, OnInit } from '@angular/core'
import { NgClass } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import {
  DataTableColumn,
  DataTableComponent,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { FilterTerminalComponent } from '../filter-terminal/filter-terminal.component'
import { TerminalDetailDialogComponent } from '../terminal-detail/terminal-detail.component'
import { TerminalesService, Terminal, TerminalFilter } from '../../../../core/services/terminales.service'
import { finalize, first } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-terminal-list',
  standalone: true,
  imports: [NgClass, FilterTerminalComponent, DataTableComponent, DataTableCellDirective],
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.scss'],
})
export class TerminalListComponent implements OnInit {
  columns: DataTableColumn<Terminal>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'comercio', header: 'Comercio', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'sucursal', header: 'Nº Sucursal', sortable: true },
    { key: 'terminal', header: 'Nº Terminal', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rowActions: RowAction<Terminal>[] = [{ id: 'view', icon: 'visibility', color: 'primary', tooltip: 'Ver detalle' }]

  allData: Terminal[] = [] 
  loading = false

  constructor(private dialog: MatDialog, private svc: TerminalesService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe((pm) => {
      const initialFilter: TerminalFilter = {}

      const rut = pm.get('rut')
      const terminal = pm.get('terminal')
      const estado = pm.get('estado')

      if (rut) initialFilter.rut = rut
      if (terminal) initialFilter.terminal = terminal
      if (estado) initialFilter.estado = estado

      if (Object.keys(initialFilter).length) {
        this.fetchData(initialFilter)
      }
    })
  }

 
  private fetchData(f: TerminalFilter): void {
    this.loading = true
    this.svc
      .getTerminales(f)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.allData = data))
  }


  onFilterChanged(f: TerminalFilter): void {
    if (!f.rut && !f.terminal && !f.estado) {
      this.allData = []
      return
    }
    this.fetchData(f)
  }

  handleAction(e: RowActionEvent<Terminal>): void {
    if (e.action === 'view') {
      this.dialog.open(TerminalDetailDialogComponent, {
        width: '1000px',
        data: e.row,
      })
    }
  }
}
