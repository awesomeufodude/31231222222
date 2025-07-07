import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgIf } from '@angular/common'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmarComercioDialogComponent } from '../confirmar-comercio/confirmar-comercio.component'

export interface Sucursal {
  codigo: number
  nombre: string
  rut: string
  numero: number
  seb: string
  tyc: string
  estado: string
  creacion: string
}

@Component({
  selector: 'app-comercio-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    NgIf,
    ButtonComponent,
    MatSlideToggleModule,
    SlideToggleComponent,
    ConfirmarComercioDialogComponent,
  ],
  templateUrl: './comercio-detail.component.html',
  styleUrls: ['./comercio-detail.component.scss'],
})
export class ComercioDetailDialogComponent {
  checked = false
  disabled = false

  constructor(
    private ref: MatDialogRef<ComercioDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Sucursal,
    private dialog: MatDialog
  ) {}

  salir(): void {
    this.ref.close()
  }

  configuraciones(): void {
    const detailRef = this.ref
    this.dialog.open(ConfirmarComercioDialogComponent, {
      width: '750px',
      data: [this.row],
      disableClose: true,
    })
    detailRef.close()
  }

  onEstadoToggle(newState: boolean, row: Sucursal) {
    console.log('Toggled row', row, 'to', newState ? 'Activo' : 'Inactivo')
  }
}
