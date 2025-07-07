import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  DataTableColumn,
  DataTableComponent,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { UsuariosService, Usuario, UsuarioFilter } from '../../../../core/services/usuarios.service'
import { UsuariosDetailDialogComponent } from '../usuarios-detail/usuarios-detail.component'
import { FilterTerminalComponent } from '../filter-terminal/filter-terminal.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { NgClass } from '@angular/common'
import { finalize, first } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [NgClass, FilterTerminalComponent, DataTableCellDirective, DataTableComponent],
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit {
  columns: DataTableColumn<Usuario>[] = [
    { key: 'nombre', header: 'Nombre', sortable: true },
    { key: 'correo', header: 'Correo', sortable: true },
    { key: 'id', header: 'ID', sortable: true },
    { key: 'rol', header: 'Rol', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
  ]

  rowActions: RowAction<Usuario>[] = [{ id: 'view', icon: 'visibility', color: 'primary', tooltip: 'Ver detalle' }]

  allData: Usuario[] = []
  loading = false

  constructor(private dialog: MatDialog, private svc: UsuariosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe((pm) => {
      const f: UsuarioFilter = {}
      if (pm.get('name')) f.name = pm.get('name')!
      if (pm.get('correo')) f.correo = pm.get('correo')!
      if (pm.get('rol')) f.rol = pm.get('rol')!
      if (Object.keys(f).length) this.fetchData(f)
    })
  }

  private fetchData(f: UsuarioFilter): void {
    this.loading = true
    this.svc
      .getUsuarios(f)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((d) => (this.allData = d))
  }
  onFilterChanged(f: UsuarioFilter): void {
    if (!f.name && !f.correo && !f.rol) {
      this.allData = []
      return
    }
    this.fetchData(f)
  }

  handleAction(e: RowActionEvent<Usuario>): void {
    if (e.action === 'view') {
      this.dialog.open(UsuariosDetailDialogComponent, {
        width: '800px',
        data: e.row,
      })
    }
  }
}
