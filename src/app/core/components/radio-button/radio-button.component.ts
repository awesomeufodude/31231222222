import { Component, Input } from '@angular/core'
import { MatRadioModule } from '@angular/material/radio'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [MatRadioModule, NgClass],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() value!: any
  @Input() disabled = false
  @Input() name: string = ''
}
