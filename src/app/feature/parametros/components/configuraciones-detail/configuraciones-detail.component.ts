import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgIf } from '@angular/common'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { InputFieldComponent } from '../../../../core/components/inputs/input.component'

export interface Configuracion {
  configuracion: string
  valor: string | number
}

@Component({
  selector: 'app-configuraciones-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule, NgIf, ButtonComponent, InputFieldComponent],
  templateUrl: './configuraciones-detail.component.html',
  styleUrls: ['./configuraciones-detail.component.scss'],
})
export class ConfiguracionesDetailDialogComponent {
  dialogForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ConfiguracionesDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Configuracion,
    private snack: MatSnackBar,
  ) {
    this.dialogForm = this.fb.group({
      config: new FormControl(row.configuracion),
      valor: new FormControl(row.valor),
    })
  }

  onClose(): void {
    this.ref.close()
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  onSave(): void {
    if (this.dialogForm.valid) {
      const updated: Configuracion = {
        configuracion: this.dialogForm.value.config,
        valor: this.dialogForm.value.valor,
      }

      this.snack.openFromComponent(SnackbarMessageComponent, {
        data: {
          text: `Configuración actualizada correctamente`,
          variant: 'success',
        },
        duration: 15000,
        panelClass: 'snack-dark',
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.ref.close(updated)
    }
  }
}
