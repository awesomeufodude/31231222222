import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgIf } from '@angular/common'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { MatDialog } from '@angular/material/dialog'
import { TerminalConfiguracionesDetailDialogComponent } from '../terminal-configuraciones/terminal-configuraciones.component'
import { AppKeyDialogComponent } from '../app-key/app-key.component'

interface Terminales {
  codigo: number
  comercio: string
  rut: string
  sucursal: number
  terminal: number
  estado: string
  creacion: string
}

@Component({
  selector: 'app-terminal-detail-dialog',
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
  templateUrl: './terminal-detail.component.html',
  styleUrls: ['./terminal-detail.component.scss'],
})
export class TerminalDetailDialogComponent {
  checked = false
  disabled = false

  constructor(
    private ref: MatDialogRef<TerminalDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Terminales,
    private dialog: MatDialog,
  ) {}

  salir(): void {
    this.ref.close()
  }

  configuraciones(): void {
    const detailRef = this.ref
    this.dialog.open(TerminalConfiguracionesDetailDialogComponent, {
      width: '750px',
      data: [this.row],
      disableClose: true,
    })
    detailRef.close()
  }

  openAppKey(): void {
    this.ref.close()
    this.dialog.open(AppKeyDialogComponent, {
      width: '400px',
      data: this.row,
    })
  }

  onEstadoToggle(newState: boolean, row: Terminales) {
    console.log('Toggled row', row, 'to', newState ? 'Activo' : 'Inactivo')
  }
}
