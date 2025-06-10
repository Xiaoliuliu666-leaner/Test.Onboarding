import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WizardDataService {
  private data: any = {};

  setData(step: string, value: any) {
    this.data[step] = value;   //Set or save data for a certain step
  }

  getData(step: string): any {
    return this.data[step]; //Read the data of a certain step
  }

  getAllData(): any {
    return this.data;//Get all the data saved during the entire wizard process
  }

  resetData() {
    this.data = {};
  }
}
