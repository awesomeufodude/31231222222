import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  TemplateRef,
} from '@angular/core'
import { CommonModule, NgClass } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
import { PageEvent } from '@angular/material/paginator'

import { CustomPaginatorComponent } from '../paginator/custom-paginator.component'
import { DataTableCellDirective } from '../../../declarations/data-table-cell.directive'

export interface DataTableColumn<T extends object = any> {
  key: keyof T & string
  header: string
  sortable?: boolean
  cellTpl?: boolean
}

export interface RowAction<T extends object = any> {
  id: string
  icon: string
  activeIcon?: string
  color?: 'primary' | 'accent' | 'warn'
  activeColor?: 'primary' | 'accent' | 'warn'
  cssClass?: string
  activeClass?: string
  tooltip?: string
}

export interface RowActionEvent<T extends object = any> {
  action: string
  row: T
  rowIndex: number
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ScrollingModule,
    DataTableCellDirective,
    CustomPaginatorComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends object = any> implements AfterViewInit, OnChanges {
  /** column configs */
  @Input() columns: DataTableColumn<T>[] = []
  /** full data array */
  @Input() data: readonly T[] = []
  /** page size */
  @Input() pageSize = 10
  /** page size options */
  @Input() pageSizeOptions: number[] = [5, 10, 25]
  /** row-action buttons */
  @Input() rowActions: RowAction<T>[] = []
  /** extra class for paginator bar */
  @Input() paginatorBarClass = ''

  /** emitted for any action click */
  @Output() action = new EventEmitter<RowActionEvent<T>>()
  /** emitted when selection toggles */
  @Output() selectionChange = new EventEmitter<T[]>()

  @ContentChildren(DataTableCellDirective) private cellTpls!: QueryList<DataTableCellDirective>
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport?: CdkVirtualScrollViewport
  @ViewChild(CustomPaginatorComponent, { static: true }) paginator!: CustomPaginatorComponent

  dataSource = new MatTableDataSource<T>([])
  displayedColumnKeys: string[] = []

  private selected = new Set<number>()
  public currentPageIndex: number = 0

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngAfterViewInit(): void {
    // init sorting and columns
    this.dataSource.sort = this.sort
    this.displayedColumnKeys = this.columns.map((c) => c.key)
    if (this.rowActions.length) {
      this.displayedColumnKeys.push('actions')
    }

    // subscribe to paginator changes
    this.paginator.page.subscribe((e: PageEvent) => {
      this.currentPageIndex = e.pageIndex
      this.goTo(e.pageIndex, e.pageSize)
    })

    // initial render
    this.goTo(0, this.pageSize)
    this.cdr.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges) {
    // whenever the `data` array itself changes, reset to page 0
    if (changes['data'] && !changes['data'].firstChange) {
      this.currentPageIndex = 0
      this.paginator.pageIndex = 0
      this.goTo(0, this.pageSize)
    }
  }

  /** slice & push into the MatTableDataSource */
  private goTo(pageIdx: number, size: number) {
    this.zone.runOutsideAngular(() => {
      const start = pageIdx * size
      const slice = this.data.slice(start, start + size)
      this.zone.run(() => {
        this.dataSource.data = slice
        this.viewport?.scrollToIndex(0)
      })
    })
  }

  tplFor(key: string): TemplateRef<any> | null {
    return this.cellTpls.find((d) => d.key === key)?.tpl ?? null
  }


  isOn(absIdx: number): boolean {
    return this.selected.has(absIdx)
  }

  getIcon(absIdx: number, act: RowAction<T>): string {
    return this.isOn(absIdx) ? act.activeIcon ?? act.icon : act.icon
  }

  getColor(absIdx: number, act: RowAction<T>): 'primary' | 'accent' | 'warn' {
    return this.isOn(absIdx) ? act.activeColor ?? act.color ?? 'primary' : act.color ?? 'primary'
  }

  getClasses(absIdx: number, act: RowAction<T>): string {
    const base = act.cssClass ?? ''
    return this.isOn(absIdx) ? `${base} ${act.activeClass ?? 'icon-green'}` : base
  }

  /**
   * rowActions button click handler
   * toggles selection for id==='select'
   */
  rowAction(act: RowAction<T>, row: T, idx: number) {
    // compute absolute index in the full `data[]`
    const absIdx = this.currentPageIndex * this.pageSize + idx

    if (act.id === 'select') {
      if (this.selected.has(absIdx)) this.selected.delete(absIdx)
      else this.selected.add(absIdx)

      // emit updated selection
      this.selectionChange.emit(this.getSelectedRows())
      console.log('Toggled row:', row)
    }

    this.action.emit({ action: act.id, row, rowIndex: absIdx })
  }

  /** map selected set back to an array of row objects */
  private getSelectedRows(): T[] {
    return Array.from(this.selected).map((i) => this.data[i])
  }

  track(_: number, r: T) {
    return (r as any).id ?? _
  }
}
