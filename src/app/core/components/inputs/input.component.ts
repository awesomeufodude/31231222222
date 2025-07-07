import { CommonModule } from '@angular/common'
import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = ''
  @Input() prefix: string = ''
  @Input() suffixIcon: string = ''
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() useMatIcon: boolean = false

  value: string = ''
  disabled = false
  private onChange = (_: any) => {}
  private onTouched = () => {}

  writeValue(obj: any): void {
    this.value = obj ?? ''
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value
    this.value = v
    this.onChange(v)
  }

  onBlur() {
    this.onTouched()
  }
}
