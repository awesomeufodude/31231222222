import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { NgIf } from '@angular/common'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'secondary' | 'danger' | 'link' | 'link-white'

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'solid'
  @Input() disabled = false
  @Input() type: 'button' | 'submit' | 'reset' = 'button'
  @Input() leadingIcon?: string
  @Input() trailingIcon?: string
  @Input() buttonTitle?: string

  @Output() buttonClick = new EventEmitter<MouseEvent>()

  @HostBinding('class')
  get hostCls(): string {
    return `ui-btn ui-btn--${this.variant}${this.disabled ? ' is-disabled' : ''}`
  }

  onClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }
    this.buttonClick.emit(e)
  }
}
