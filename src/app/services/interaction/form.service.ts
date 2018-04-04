import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormInteractionService {

  private exerciseSetFormSubject = new Subject<any>();

  disableOtherSetForms(index: number) {
    this.exerciseSetFormSubject.next({ index: index});
  }

  getSetFormObservable(): Observable<any> {
    return this.exerciseSetFormSubject.asObservable();
  }

  constructor() { }
}
