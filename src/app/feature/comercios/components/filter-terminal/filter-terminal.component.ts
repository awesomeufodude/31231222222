import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { NgIf, NgFor } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { InputFieldComponent } from '../../../../core/components/inputs/input.component'
import { ButtonComponent } from '../../../../core/components/button/button.component'

export interface ComercioFilter {
  name?: string
  rut?: string
  estado?: string
}

@Component({
  selector: 'app-filter-terminal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    SelectFieldComponent,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './filter-terminal.component.html',
  styleUrls: ['./filter-terminal.component.scss'],
})
export class FilterTerminalComponent implements OnChanges {

  @Input() filterParams: ComercioFilter = {}

  @Output() filter = new EventEmitter<ComercioFilter>()
  @Output() add = new EventEmitter<void>()

  form: FormGroup

  estados = ['Activo', 'Inactivo', 'Suspendido']

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl(''),
      rut: new FormControl(''),
      estado: new FormControl<string | null>(null),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterParams'] && changes['filterParams'].currentValue) {
      this.form.patchValue(changes['filterParams'].currentValue, { emitEvent: false })
    }
  }

  onRefresh(): void {
    const { name, rut, estado } = this.form.value
    this.filter.emit({
      name: name?.trim() || undefined,
      rut: rut?.trim() || undefined,
      estado: estado || undefined,
    })
  }

  onAdd(): void {
    this.add.emit()
  }
}
