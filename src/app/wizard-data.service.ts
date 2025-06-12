import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WizardDataService {
  private data: any = {};
  private savedEntries: any[] = [];

  setData(step: string, value: any) {
    this.data[step] = value;   //Set or save data for a certain step
  }

  getData(step: string): any {
    return this.data[step]; //Read the data of a certain step
  }

  getAllData(): any {
    return this.data;//Get all the data saved during the entire wizard process
  }

  saveWizardData(formData: any) {
    this.data = formData;
    this.savedEntries.push(formData);
  }

  saveWizardEntry(entry: any) {
    this.savedEntries.push(entry); 
  }

  getWizardData() {
    return this.data;
  }

  getAllEntries() {
  return this.savedEntries;
}

  resetData() {
    this.data = {};
  }

  wizardData = {
  modules: [] as string[],
  moduleDetails: {} as Record<string, any>
  };

  //Save detailed data of a single module
   setModuleDetail(key: string, detail: any) {
    this.wizardData.moduleDetails[key] = detail;
  }

  // Get the key of the next selected module
   getNextModule(current: string): string | null {
    const mods = this.wizardData.modules;
    const idx = mods.indexOf(current);
    return idx >= 0 && idx < mods.length - 1 ? mods[idx + 1] : null;
  }

  // Set all currently selected modules
  setSelectedModules(modules: string[]) {
    this.wizardData.modules = modules;
  }

  // Get all currently selected modules
  getSelectedModules(): string[] {
    return this.wizardData.modules;
  }
  
}
