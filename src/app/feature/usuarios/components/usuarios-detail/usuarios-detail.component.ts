import { Component, Inject } from '@angular/core'
import { CommonModule, NgIf } from '@angular/common'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'

export interface Usuario {
  nombre: string
  correo: string
  id: string
  rol: string
  estado: 'Activo' | 'Inactivo'
}

@Component({
  selector: 'app-usuarios-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    NgIf,
    ButtonComponent,
    MatSlideToggleModule,
    SlideToggleComponent,
  ],
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.scss'],
})
export class UsuariosDetailDialogComponent {
  
  horizontalPosition = 'start' as const
  verticalPosition = 'bottom' as const

  constructor(
    private ref: MatDialogRef<UsuariosDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Usuario,
    private snack: MatSnackBar,
  ) {}

  salir(): void {
    this.ref.close()
  }

  guardar(): void {
    this.snack.openFromComponent(SnackbarMessageComponent, {
      data: {
        text: 'Los datos del usuario se han guardado exitosamente',
        variant: 'success',
      },
      duration: 5000,
      panelClass: 'snack-dark',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })

    this.ref.close(this.row)
  }

  onEstadoToggle(newState: boolean) {
    this.row.estado = newState ? 'Activo' : 'Inactivo'
    console.log('Estado cambiado a', this.row.estado, 'para', this.row)
  }
}
