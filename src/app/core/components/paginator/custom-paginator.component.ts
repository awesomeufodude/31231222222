import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPaginatorComponent {
  @Input() length = 0
  @Input() pageSize = 10
  @Input() pageIndex = 0
  @Input() pageSizeOptions: number[] = [5, 10, 25]
  @Output() page = new EventEmitter<PageEvent>()

  private _pagesCache: (number | '…')[] = []
  private _cacheKey = ''

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.length / this.pageSize))
  }

  get pages(): (number | '…')[] {
    const key = `${this.totalPages}-${this.pageIndex}`
    if (key === this._cacheKey) return this._pagesCache

    const t = this.totalPages,
      c = this.pageIndex + 1,
      out: (number | '…')[] = []

    if (t <= 7) {
      for (let i = 1; i <= t; i++) out.push(i)
    } else {
      const l = Math.max(2, c - 1),
        r = Math.min(t - 1, c + 1)
      out.push(1)
      if (l > 2) out.push('…')
      for (let i = l; i <= r; i++) out.push(i)
      if (r < t - 1) out.push('…')
      out.push(t)
    }
    this._cacheKey = key
    this._pagesCache = out
    return out
  }

  goPage(p: number | '…') {
    if (p !== '…' && p - 1 !== this.pageIndex) {
      this.pageIndex = p - 1
      this.emit()
    }
  }
  changePageSize(s: number) {
    if (s !== this.pageSize) {
      this.pageSize = s
      this.pageIndex = 0
      this.emit()
    }
  }
  prev() {
    if (this.pageIndex) {
      this.pageIndex--
      this.emit()
    }
  }
  next() {
    if (this.pageIndex + 1 < this.totalPages) {
      this.pageIndex++
      this.emit()
    }
  }

  trackByPage(_: number, x: number | '…') {
    return x
  }

  private emit() {
    this._pagesCache = []
    this.page.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.length })
  }
}
