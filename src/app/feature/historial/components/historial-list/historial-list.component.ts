import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  DataTableColumn,
  DataTableComponent,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { HistorialService, Historial, HistorialFilter } from '../../../../core/services/historial.service'
import { HistorialDetailDialogComponent } from '../historial-detail/historial-detail.component'
import { FilterTerminalComponent } from '../filter-terminal/filter-terminal.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { NgClass } from '@angular/common'
import { finalize, first } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-historial-list',
  standalone: true,
  imports: [NgClass, FilterTerminalComponent, DataTableCellDirective, DataTableComponent],
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.scss'],
})
export class HistorialListComponent implements OnInit {
  columns: DataTableColumn<Historial>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'tipoAccion', header: 'Tipo acción', sortable: true },
    { key: 'objeto', header: 'Objeto', sortable: true },
    { key: 'usuario', header: 'Usuario', sortable: true },
    { key: 'actualizacion', header: 'Actualización', sortable: true },
  ]

  rowActions: RowAction<Historial>[] = [{ id: 'view', icon: 'visibility', color: 'primary', tooltip: 'Ver detalle' }]

  allData: Historial[] = []
  loading = false

  constructor(private dialog: MatDialog, private svc: HistorialService, private route: ActivatedRoute) {}

 
  ngOnInit(): void {
    
    this.route.queryParamMap.pipe(first()).subscribe((pm) => {
      const f: HistorialFilter = {}
      if (pm.get('tipoAccion')) f.tipoAccion = pm.get('tipoAccion')!
      if (pm.get('objeto')) f.objeto = pm.get('objeto')!
      if (pm.get('fromDate')) f.fromDate = new Date(pm.get('fromDate')!)
      if (pm.get('toDate')) f.toDate = new Date(pm.get('toDate')!)

      if (Object.keys(f).length) this.fetchData(f)
    })
  }

  
  private fetchData(f: HistorialFilter): void {
    this.loading = true
    this.svc
      .getHistorial(f)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.allData = data))
  }

  
  onFilterChanged(f: HistorialFilter): void {
    if (!f.tipoAccion && !f.objeto && !f.fromDate && !f.toDate) {
      this.allData = []
      return
    }
    this.fetchData(f)
  }

 
  handleAction(e: RowActionEvent<Historial>): void {
    if (e.action === 'view') {
      this.dialog.open(HistorialDetailDialogComponent, {
        width: '800px',
        data: e.row,
      })
    }
  }
}
