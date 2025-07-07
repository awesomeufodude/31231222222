import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
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
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-agregar-usuarios-dialog',
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
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.scss'],
})
export class AgregarUsuariosDialogComponent {
  dialogForm: FormGroup
  roles: string[]

  constructor(
    private fb: FormBuilder,
    private parentRef: MatDialogRef<AgregarUsuariosDialogComponent>,
    private snack: MatSnackBar,
  ) {
    this.roles = ['Administrador', 'Usuario', 'Invitado', 'Operador', 'Auditor']

    this.dialogForm = this.fb.group({
      id: new FormControl(''),
      correo: new FormControl(''),
      rol: new FormControl(this.roles[0]),
    })
  }

  get rolControl(): FormControl {
    return this.dialogForm.get('rol') as FormControl
  }

  onClose() {
    this.parentRef.close()
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  onSave(): void {
    if (!this.dialogForm.valid) return

    this.snack.openFromComponent(SnackbarMessageComponent, {
      data: {
        text: `Usuario ${this.dialogForm.value.id} agregado correctamente`,
        variant: 'success',
      },
      duration: 15000,
      panelClass: 'snack-dark',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })

    this.parentRef.close()
  }
}
