import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common'
import { InputFieldComponent } from '../../../../core/components/inputs/input.component'
import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { QueryParamSyncService } from '../../../../core/services/query-param-sync.service'
import { UsuarioFilter } from '../../../../core/services/usuarios.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { AgregarUsuariosDialogComponent } from '../agregar-usuarios/agregar-usuarios.component'

@Component({
  selector: 'app-filter-terminal',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    InputFieldComponent, 
    SelectFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './filter-terminal.component.html',
  styleUrls: ['./filter-terminal.component.scss'],
})
export class FilterTerminalComponent {
  @Output() filterChange = new EventEmitter<UsuarioFilter>()

  form: FormGroup
  roles = ['Administrador', 'Usuario', 'Invitado', 'Operador', 'Auditor']

  constructor(private fb: FormBuilder, private qpSync: QueryParamSyncService, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: [''],
      correo: [''],
      rol: [''],
    })

    this.qpSync
      .readParams<UsuarioFilter>(['name', 'correo', 'rol'])
      .subscribe((p) => this.form.patchValue(p, { emitEvent: false }))
  }

  onRefresh(): void {
    const raw = this.form.value
    const filter: UsuarioFilter = {
      name: raw.name?.trim() || undefined,
      correo: raw.correo?.trim() || undefined,
      rol: raw.rol || undefined,
    }

    this.qpSync.updateParams(filter)
    this.filterChange.emit(filter)
  }

  onAddTerminal(): void {
    this.dialog.open(AgregarUsuariosDialogComponent, {
      width: '860px',
      panelClass: 'app-dialog-container',
      disableClose: true,
    })
  }

  get rolControl(): FormControl {
    return this.form.get('rol') as FormControl
  }
}
