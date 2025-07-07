import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'

import { ButtonComponent } from '../../../../core/components/button/button.component'

export interface Terminales {
  codigo: number
  comercio: string
  rut: string
  sucursal: number
  terminal: number
  estado: string
  creacion: string
}

@Component({
  selector: 'app-app-key-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './app-key.component.html',
  styleUrls: ['./app-key.component.scss'],
})
export class AppKeyDialogComponent {
  
  appKey = Math.floor(100000 + Math.random() * 900000).toString()

  constructor(private ref: MatDialogRef<AppKeyDialogComponent>, @Inject(MAT_DIALOG_DATA) public row: Terminales) {}

  cerrar() {
    this.ref.close()
  }
}
