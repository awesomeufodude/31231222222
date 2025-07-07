import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
})
export class SlideToggleComponent {
  @Input() checked = false
  @Input() disabled = false
  @Input() labelPosition: 'before' | 'after' = 'before'
  @Input() label = ''
  @Input() toggleClass: string | string[] = ''
  @Output() toggled = new EventEmitter<boolean>()

  onChange(event: MatSlideToggleChange) {
    this.toggled.emit(event.checked)
  }
}
