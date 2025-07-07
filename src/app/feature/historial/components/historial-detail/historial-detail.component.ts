import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, NgIf } from '@angular/common'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SlideToggleComponent } from '../../../../core/components/slide-toggle/slide-toggle.component'
import { MatDialog } from '@angular/material/dialog'

export interface Historial {
  codigo: string
  tipoAccion: string
  objeto: string
  usuario: string
  actualizacion: string
  json: string
}

@Component({
  selector: 'app-historial-detail-dialog',
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
  templateUrl: './historial-detail.component.html',
  styleUrls: ['./historial-detail.component.scss'],
})
export class HistorialDetailDialogComponent {
  constructor(
    private ref: MatDialogRef<HistorialDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Historial,
    private dialog: MatDialog,
  ) {}

  salir(): void {
    this.ref.close()
  }
}
