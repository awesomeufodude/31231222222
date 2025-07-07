import {
    Directive,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    ElementRef
  } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { Subscription } from 'rxjs';
  
  @Directive({
    selector: '[appPaginatorWithNumbers]'
  })
  export class PaginatorWithNumbersDirective implements AfterViewInit, OnDestroy {
    private sub = new Subscription();
  
    constructor(
      private paginator: MatPaginator,
      private el: ElementRef,
      private renderer: Renderer2
    ) {}
  
    ngAfterViewInit() {
      this.renderButtons();
      this.sub.add(this.paginator.page.subscribe(() => this.renderButtons()));
    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
  
    private renderButtons() {
      const host: HTMLElement = this.el.nativeElement;
      const old = host.querySelector('.page-numbers-container');
      if (old) this.renderer.removeChild(host, old);
  
      const total = Math.ceil(this.paginator.length / this.paginator.pageSize);
      if (total <= 1) return;

      const container = this.renderer.createElement('div');
      this.renderer.addClass(container, 'page-numbers-container');
  
      for (let i = 1; i <= total; i++) {
        const btn = this.renderer.createElement('button');
        this.renderer.addClass(btn, 'page-btn');
        if (i === this.paginator.pageIndex + 1) {
          this.renderer.addClass(btn, 'active');
        }
        const txt = this.renderer.createText(i.toString());
        this.renderer.appendChild(btn, txt);
  
        this.renderer.listen(btn, 'click', () => {
          this.paginator.pageIndex = i - 1;

          this.paginator.page.next({
            pageIndex: this.paginator.pageIndex,
            pageSize:  this.paginator.pageSize,
            length:    this.paginator.length
          });
        });
  
        this.renderer.appendChild(container, btn);
      }

      const rangeLabel = host.querySelector('.mat-mdc-paginator-range-label');
      if (rangeLabel && rangeLabel.parentNode) {
        this.renderer.insertBefore(
          rangeLabel.parentNode,
          container,
          rangeLabel.nextSibling
        );
      }
    }
  }