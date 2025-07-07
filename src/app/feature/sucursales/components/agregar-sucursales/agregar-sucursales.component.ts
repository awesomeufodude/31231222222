import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { NgClass, NgIf } from '@angular/common'

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

import { SucursalesService, Sucursal as SucursalModel } from '../../../../core/services/sucursales.service'
import { debounceTime, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

export interface DialogData {
  rows?: SucursalModel[]
}

@Component({
  selector: 'app-agregar-sucursales-dialog',
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
  templateUrl: './agregar-sucursales.component.html',
  styleUrls: ['./agregar-sucursales.component.scss'],
})
export class AgregarSucursalesDialogComponent implements OnInit {
  dialogForm!: FormGroup


  columns: DataTableColumn<SucursalModel>[] = [
    { key: 'codigo', header: 'Código', sortable: true },
    { key: 'comercio', header: 'Comercio', sortable: true },
    { key: 'rut', header: 'RUT', sortable: true },
    { key: 'sucursal', header: 'Nº Sucursal', sortable: true },
    { key: 'estado', header: 'Estado', sortable: true, cellTpl: true },
    { key: 'creacion', header: 'Creación', sortable: true },
  ]

  rows: SucursalModel[] = []

  rowActions: RowAction<SucursalModel>[] = [
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
  selectedRows: SucursalModel[] = []

  
  constructor(
    private fb: FormBuilder,
    private parentRef: MatDialogRef<AgregarSucursalesDialogComponent>,
    private dialog: MatDialog,
    private sucursalesService: SucursalesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  
  ngOnInit(): void {
    
    this.dialogForm = this.fb.group({
      rut: [''],
      sucursal: [''], 
    })

   
    this.dialogForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(({ rut, sucursal }) => {
          const rutTrim = rut?.trim() ?? ''
          const sucTrim = sucursal?.trim() ?? ''

      
          if (!rutTrim && !sucTrim) {
            return of([]) 
          }

          return this.sucursalesService.getSucursales({
            rut: rutTrim,
            sucursal: sucTrim,
          })
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

  onSelection(arr: SucursalModel[]): void {
    this.selectedRows = arr
    this.hasSelection = arr.length > 0
  }

  handleAction(e: RowActionEvent<SucursalModel>): void {
    console.log('generic action event:', e)
  }
}
