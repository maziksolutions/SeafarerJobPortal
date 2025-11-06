import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private messageSource = new BehaviorSubject(false);
   isLoading = this.messageSource.asObservable();
  setLoadingStatus(message: boolean):void {
    this.messageSource.next(message)
  }
  getLoadingStatus(): Observable<boolean> {
    return this.isLoading;
  }
  constructor() { }
}
