import { Component, Inject } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgFor, NgIf } from '@angular/common'

import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'
import { ComercioRow } from '../agregar-comercio/agregar-comercio.component'

@Component({
  selector: 'app-confirmar-comercio-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    NgFor,
    NgIf,
    SelectFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './confirmar-comercio.component.html',
  styleUrls: ['./confirmar-comercio.component.scss'],
})
export class ConfirmarComercioDialogComponent {
  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ConfirmarComercioDialogComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public selected: ComercioRow[] = [],
  ) {

    this.form = this.fb.array(
      this.selected.map(() =>
        this.fb.group({
          op: new FormControl(this.cuentas[0]),
          cm: new FormControl(this.cuentas[0]),
        }),
      ),
    )
  }

  readonly cuentas = ['Cuenta corriente 869503945678', 'Cuenta vista 617492834561']
  form: FormArray

  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  rowGroup(i: number): FormGroup {
    return this.form.at(i) as FormGroup
  }

  volver(): void {
    this.ref.close()
  }

  confirmar(): void {
    if (this.form.invalid) return

    this.snack.openFromComponent(SnackbarMessageComponent, {
      data: {
        text: 'Los comercios se han agregado de forma exitosa',
        variant: 'success',
      },
      duration: 15000,
      panelClass: 'snack-dark',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })

    this.ref.close(this.form.value)
  }
}
