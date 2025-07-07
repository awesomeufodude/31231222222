import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { NgClass, NgFor } from '@angular/common'
import { InputFieldComponent } from '../../../../core/components/inputs/input.component'
import { SelectFieldComponent } from '../../../../core/components/select/select-field.component'
import { ButtonComponent } from '../../../../core/components/button/button.component'
import { DataTableCellDirective } from '../../../../declarations/data-table-cell.directive'
import { AgregarTerminalesDialogComponent, DialogData } from '../agregar-terminales/agregar-terminales.component'
import { TerminalesService, Terminal, TerminalFilter } from '../../../../core/services/terminales.service'
import { QueryParamSyncService } from '../../../../core/services/query-param-sync.service'

@Component({
  selector: 'app-filter-terminal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgFor,
    InputFieldComponent,
    SelectFieldComponent,
    ButtonComponent,
    NgClass,
    DataTableCellDirective,
  ],
  templateUrl: './filter-terminal.component.html',
  styleUrls: ['./filter-terminal.component.scss'],
})
export class FilterTerminalComponent {

  @Output() filterChange = new EventEmitter<TerminalFilter>()

  form: FormGroup
  estados = ['Activo', 'Inactivo', 'Suspendido']

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private terminalesService: TerminalesService,
    private qpSync: QueryParamSyncService,
  ) {

    this.form = this.fb.group({
      rut: new FormControl(''),
      terminal: new FormControl(''),
      estado: new FormControl(''),
    })

    this.qpSync
      .readParams<TerminalFilter>(['rut', 'terminal', 'estado'])
      .subscribe((p) => this.form.patchValue(p, { emitEvent: false }))
  }

  
  get estadoControl(): FormControl {
    return this.form.get('estado') as FormControl
  }

  onRefresh(): void {
    const raw = this.form.value
    const filter: TerminalFilter = {
      rut: raw.rut?.trim() || undefined,
      terminal: raw.terminal?.trim() || undefined,
      estado: raw.estado || undefined,
    }

  
    this.qpSync.updateParams<TerminalFilter>(filter)

    
    this.filterChange.emit(filter)
  }

  onAddTerminal(): void {
    this.terminalesService.getTerminales().subscribe((rows: Terminal[]) => {
      const data: DialogData = {
        rut: this.form.value.rut,
        rows,
      }
      const dialogRef = this.dialog.open(AgregarTerminalesDialogComponent, {
        width: '1000px',
        panelClass: 'app-dialog-container',
        data,
        disableClose: true,
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Nuevo terminal creado:', result)
        }
      })
    })
  }
}
