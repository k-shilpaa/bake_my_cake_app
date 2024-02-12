import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDate: Date;
  constructor() { 
    this.currentDate = new Date();
  }
  getCurrentDate(): Date {
    return this.currentDate;
  }
}
