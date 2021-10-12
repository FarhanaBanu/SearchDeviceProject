import { Directive } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appInputDebounce]'
})

export class InputDebounceDirective implements OnInit, OnDestroy {

  @Input() debounceTime = 500;
  @Output() callBack = new EventEmitter();
  private input = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.input.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e =>
      this.callBack.emit(e));
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }

  @HostListener('input', ['$event'])
  clickEvent(event) {
    this.input.next(event);
  }

}
