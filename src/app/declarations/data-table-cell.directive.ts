import { Directive, Input, TemplateRef } from '@angular/core'

@Directive({
  selector: '[dataTableCell]',
  standalone: true,
})
export class DataTableCellDirective {
  @Input('dataTableCell') key!: string
  constructor(public tpl: TemplateRef<unknown>) {}
}
