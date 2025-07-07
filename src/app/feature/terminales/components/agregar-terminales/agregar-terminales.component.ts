import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { NgClass, NgIf } from '@angular/common'

import { InputFieldComponent } from '../../../../core/components/inputs/input.component'
import {
  DataTableComponent,
  DataTableColumn,
  RowAction,
  RowActionEvent,
} from '../../../../core/components/data-table/data-table.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { ButtonComponent } from '../../../../core/components/button/button.component'

import { TerminalesService, Terminal as Terminales, TerminalFilter } from '../../../../core/services/terminales.service'
import { debounceTime, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

export interface DialogData {
  rut?: string
  terminal?: string
  rows?: Terminales[]
}

@Component({
  selector: 'app-agregar-terminales-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    InputFieldComponent,
    DataTableComponent,
    DataTableCellDirective,
    ButtonComponent,
  ],
  templateUrl: './agregar-terminales.component.html',
  styleUrls: ['./agregar-terminales.component.scss'],
})
export class AgregarTerminalesDialogComponent {
  dialogForm: FormGroup

  columns: DataTableColumn<Terminales>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'comercio', header: 'Comercio', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'sucursal', header: 'Nº Sucursal', sortable: true },
    { key: 'terminal', header: 'Nº Terminal', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rows: Terminales[] = []

  rowActions: RowAction<Terminales>[] = [
    {
      id: 'select',
      icon: 'add_circle',
      activeIcon: 'check_circle',
      color: 'primary',
      activeColor: 'accent',
      cssClass: 'material-symbols-outlined',
      activeClass: 'icon-green',
      tooltip: 'Añadir',
    },
  ]

  hasSelection = false
  selectedRows: Terminales[] = []

  constructor(
    private fb: FormBuilder,
    private parentRef: MatDialogRef<AgregarTerminalesDialogComponent>,
    private dialog: MatDialog,
    private terminalesService: TerminalesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogForm = this.fb.group({
      rut: new FormControl(data.rut ?? ''),
      terminal: new FormControl(data.terminal ?? ''),
    })

   
    this.dialogForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(({ rut, terminal }) => {
          const rutTrim = rut?.trim() ?? ''
          const termTrim = terminal?.trim() ?? ''

          if (!rutTrim && !termTrim) {
            return of([]) 
          }

          const filter: TerminalFilter = {
            rut: rutTrim || undefined,
            terminal: termTrim || undefined,
          }

          return this.terminalesService.getTerminales(filter)
        }),
      )
      .subscribe((data) => (this.rows = data))
  }

  onClose(): void {
    this.parentRef.close()
  }

  onSave(): void {
    if (!this.dialogForm.valid || !this.hasSelection) return
    console.log('Selected rows:', this.selectedRows)
  }

  onSelection(arr: Terminales[]): void {
    this.selectedRows = arr
    this.hasSelection = arr.length > 0
  }

  handleAction(e: RowActionEvent<Terminales>): void {
    console.log('generic action event:', e)
  }
}
