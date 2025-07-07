import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule, IsActiveMatchOptions } from '@angular/router'

/* Angular Material */
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'app-backoffice-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  templateUrl: './backoffice-layout.component.html',
  styleUrl: './backoffice-layout.component.scss',
})
export class BackofficeLayoutComponent {
  private matchOpts: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  }

  constructor(private router: Router) {}


  isActive(route: string): boolean {
    const tree = this.router.createUrlTree([route])
    return this.router.isActive(tree, this.matchOpts)
  }
}
