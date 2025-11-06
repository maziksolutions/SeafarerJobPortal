import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VesselStateService {
  private vesselsSubject = new BehaviorSubject<any[]>([]);
  private fullVesselListSubject = new BehaviorSubject<any[]>([]);
  
  vessels$ = this.vesselsSubject.asObservable();
  fullVesselList$ = this.fullVesselListSubject.asObservable();

  private isDataLoaded = false;

  constructor() {}

  setVessels(vessels: any[]) {
    const activeVessels = vessels.filter(x => x.isActive);
    this.vesselsSubject.next(activeVessels);
    this.fullVesselListSubject.next(activeVessels);
    this.isDataLoaded = true;
  }

  updateVesselsBasedOnFleet(vesselIds: string[]) {
    const currentFullVesselList = this.fullVesselListSubject.getValue();
    const filteredVessels = currentFullVesselList.filter(x => 
      vesselIds.includes(x.vesselId.toString())
    );
    this.vesselsSubject.next(filteredVessels);
  }

  clearVessels() {
    this.vesselsSubject.next([]);
    this.fullVesselListSubject.next([]);
    this.isDataLoaded = false;
  }

  isLoaded(): boolean {
    return this.isDataLoaded;
  }

  getCurrentVessels(): any[] {
    return this.vesselsSubject.getValue();
  }

  getCurrentFullVesselList(): any[] {
    return this.fullVesselListSubject.getValue();
  }
}