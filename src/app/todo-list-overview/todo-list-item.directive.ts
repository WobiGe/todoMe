import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[todoListsDirective]'
})
export class todoListsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
