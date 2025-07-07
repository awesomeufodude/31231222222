import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgIf } from '@angular/common'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { MatDialog } from '@angular/material/dialog'
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

export interface Sucursal {
  codigo: number
  Sucursales: string
  rut: string
  sucursal: number
  estado: string
  creacion: string
}

@Component({
  selector: 'app-sucursales-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    NgIf,
    ButtonComponent,
    MatSlideToggleModule,
    SlideToggleComponent,
  ],
  templateUrl: './sucursales-detail.component.html',
  styleUrls: ['./sucursales-detail.component.scss'],
})
export class SucursalesDetailDialogComponent {
  checked = false
  disabled = false

  constructor(
    private ref: MatDialogRef<SucursalesDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Sucursal,
    private dialog: MatDialog,
    private snack: MatSnackBar,
  ) {}

  salir(): void {
    this.ref.close()
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
    verticalPosition: MatSnackBarVerticalPosition = 'bottom'

  guardar(): void {
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
    this.ref.close()
  }

  onEstadoToggle(newState: boolean, row: Sucursal) {
    console.log('Toggled row', row, 'to', newState ? 'Activo' : 'Inactivo')
  }
}
