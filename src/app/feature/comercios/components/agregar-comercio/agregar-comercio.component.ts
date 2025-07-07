import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { NgClass, NgIf } from '@angular/common'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { merge } from 'rxjs'

import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { InputFieldComponent } from '../../../../core/components/inputs/input.component'
import {
  DataTableComponent,
  DataTableColumn,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { ConfirmarComercioDialogComponent } from '../confirmar-comercio/confirmar-comercio.component'
import { ComercioService, Comercio } from '../../../../core/services/comercios.service'

export interface ComercioRow extends Comercio {
  numero: number
}

export interface DialogData {
  name?: string
  rut?: string
  estado?: string
  estados?: string[]
}

@Component({
  selector: 'app-agregar-comercio-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    SelectFieldComponent,
    InputFieldComponent,
    DataTableComponent,
    DataTableCellDirective,
    ButtonComponent,
  ],
  templateUrl: './agregar-comercio.component.html',
  styleUrls: ['./agregar-comercio.component.scss'],
})
export class AgregarComercioDialogComponent implements OnInit {
  dialogForm = this.fb.group({
    name: new FormControl(''),
    rut: new FormControl(''),
    estado: new FormControl(''),
  })

  estados = this.data.estados ?? ['Activo', 'Inactivo', 'Suspendido']

  columns: DataTableColumn<ComercioRow>[] = [
    { key: 'nombre', header: 'Nombre', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'numero', header: 'Número', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rows: ComercioRow[] = []
  rowActions: RowAction<ComercioRow>[] = [
    {
      id: 'select',
      icon: 'add_circle',
      activeIcon: 'check_circle',
      color: 'primary',
      cssClass: 'material-symbols-outlined',
      activeClass: 'icon-green',
      tooltip: 'Añadir',
    },
  ]

  hasSelection = false
  selectedRows: ComercioRow[] = []

  constructor(
    private fb: FormBuilder,
    private svc: ComercioService,
    private parentRef: MatDialogRef<AgregarComercioDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    
    const nameChanges = this.dialogForm.controls.name.valueChanges
    const rutChanges = this.dialogForm.controls.rut.valueChanges
    const estadoChanges = this.dialogForm.controls.estado.valueChanges

    merge(nameChanges, rutChanges, estadoChanges)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          const { name, rut, estado } = this.dialogForm.value
          return this.svc.getComercioes({
            name: name || undefined,
            rut: rut || undefined,
            estado: estado || undefined,
          })
        }),
      )
      .subscribe((data) => {
        this.rows = data.map((r) => ({ ...r, numero: r.numero }))
      })
  }

  onClose() {
    this.parentRef.close()
  }

  onSave() {
    if (!this.dialogForm.valid || !this.hasSelection) return
    const sel = this.selectedRows
    this.dialog.open(ConfirmarComercioDialogComponent, {
      width: '750px',
      data: sel,
      disableClose: false,
    })
    this.parentRef.close()
  }

  onSelection(arr: ComercioRow[]) {
    this.selectedRows = arr
    this.hasSelection = arr.length > 0
  }

  handleAction(e: RowActionEvent<ComercioRow>) {
    console.log('action', e)
  }
}
