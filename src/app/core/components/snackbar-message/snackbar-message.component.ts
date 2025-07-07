import { Component, Inject } from '@angular/core'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule, NgClass } from '@angular/common'
import { ButtonComponent } from '../button/button.component'

type Variant = 'success' | 'info' | 'warning' | 'error'

interface SnackData {
  text: string
  variant?: Variant
  icon?: string
}

@Component({
  selector: 'app-snackbar-message',
  standalone: true,
  imports: [
    NgClass,
    CommonModule, 
    MatSnackBarModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './snackbar-message.component.html',
  styleUrls: ['./snackbar-message.component.scss'],
})
export class SnackbarMessageComponent {
  constructor(
    public ref: MatSnackBarRef<SnackbarMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackData,
  ) {}

  get variant(): Variant {
    return this.data.variant ?? 'info'
  }

  get icon(): string {
    if (this.data.icon) return this.data.icon
    return { success: 'check_circle', info: 'info', warning: 'warning', error: 'error' }[this.variant]
  }

  close(): void {
    this.ref.dismiss()
  }
}
