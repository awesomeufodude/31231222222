import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgFor } from '@angular/common'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { SnackbarMessageComponent } from '../../../../core/components/snackbar-message/snackbar-message.component'
import { MatTabsModule } from '@angular/material/tabs'

export interface Terminales {
  codigo: number
  sucursal: string
  rut: string
  estado: string
  creacion: string
}

interface Feature {
  key: string
  label: string
  enabled: boolean
}

@Component({
  selector: 'app-terminal-configuraciones-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    NgFor,
    ButtonComponent,
    SlideToggleComponent,
    MatTabsModule,
  ],
  templateUrl: './terminal-configuraciones.component.html',
  styleUrls: ['./terminal-configuraciones.component.scss'],
})
export class TerminalConfiguracionesDetailDialogComponent {
  
  features: Feature[] = [
    { key: 'giro', label: 'Giro', enabled: true },
    { key: 'deposito', label: 'Depósito', enabled: true },
    { key: 'pagoCuentas', label: 'Pago de cuentas', enabled: false },
    { key: 'recarga', label: 'Recarga', enabled: true },
    { key: 'recargaTransporte', label: 'Recarga transporte', enabled: true },
    { key: 'creacionCuentas', label: 'Creación de cuentas', enabled: true },
  ]

  horizontalPosition = 'start' as const
  verticalPosition = 'bottom' as const

  constructor(
    private ref: MatDialogRef<TerminalConfiguracionesDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Terminales,
    private snack: MatSnackBar,
  ) {}

  volver(): void {
    this.ref.close()
  }

  onToggle(f: Feature, newState: boolean) {
    f.enabled = newState
    console.log(`Feature ${f.key} toggled to`, newState)
  }

  confirmar(): void {
    console.log('Final feature states:', this.features)

    this.snack.openFromComponent(SnackbarMessageComponent, {
      data: {
        text: 'Configuraciones guardadas con éxito',
        variant: 'success',
      },
      duration: 5000,
      panelClass: 'snack-dark',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })

    this.ref.close(this.features)
  }
}
