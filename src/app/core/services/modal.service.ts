import { Injectable, Type } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  /**
   * Opens any component as a MatDialog.
   * @param component The dialog component class.
   * @param data      Data to inject via MAT_DIALOG_DATA.
   * @param config    Partial overrides for MatDialogConfig.
   */
  open<T, D = any, R = any>(component: Type<T>, data?: D, config?: Partial<MatDialogConfig<D>>): MatDialogRef<T, R> {
    const dialogConfig = new MatDialogConfig<D>()

    dialogConfig.autoFocus = true
    dialogConfig.disableClose = config?.disableClose ?? false
    dialogConfig.width = config?.width ?? '500px'
    dialogConfig.height = config?.height
    dialogConfig.data = data

    return this.dialog.open(component, dialogConfig)
  }

  closeAll(): void {
    this.dialog.closeAll()
  }
}
