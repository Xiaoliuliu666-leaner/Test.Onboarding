import { Injectable } from '@angular/core';


export interface ClientToOnboard {
  tenant: {
    tenant?: string;          
    newTenantName?: string;   
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    createdBy?: string;       
    configNotes?: string;     
  },
  modules: {
    [key: string]: any;
    userManagement?: any;
    reporting?: any;
    billing?: any;
    support?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class WizardDataService {
  private currentClient: ClientToOnboard = {
  tenant: {
    tenant: '',
    newTenantName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    createdBy: '',
    configNotes: ''
  },
  modules: {}
};
  private savedEntries: ClientToOnboard[] = [];

  // Tenant Info
  setTenantInfo(info: {tenant?: string; newTenantName?: string; contactName: string; contactEmail: string; contactPhone: string; createdBy?: string; configNotes?: string;})
  {
  this.currentClient.tenant = { ...info };
  }
  getTenantInfo() {
    return this.currentClient.tenant;
  }

  // Select Module
  setSelectedModules(moduleKeys: string[]) {

    moduleKeys.forEach(key => {
      if (!this.currentClient.modules[key]) this.currentClient.modules[key] = {};
    });
    
    Object.keys(this.currentClient.modules).forEach(key => {
      if (!moduleKeys.includes(key)) delete this.currentClient.modules[key];
    });
  }
  getSelectedModules(): string[] {
    return Object.keys(this.currentClient.modules);
  }

  
  setModuleDetail(moduleKey: string, detail: any) {
    this.currentClient.modules[moduleKey] = { ...detail };
  }
  getModuleDetail(moduleKey: string) {
    return this.currentClient.modules[moduleKey];
  }

  
  getCurrentClient(): ClientToOnboard {
    return this.currentClient;
  }
  setCurrentClient(client: ClientToOnboard) {
    this.currentClient = { ...client };
  }
  resetCurrentClient() {
    this.currentClient = {
      tenant: { contactName: '', contactEmail: '', contactPhone: '' },
      modules: {}
    };
  }

  // Data history
  saveCurrentClient() {
    //this.savedEntries.push(JSON.parse(JSON.stringify(this.currentClient)));
    //this.savedEntries = [JSON.parse(JSON.stringify(this.currentClient))];
    const newEntry = JSON.parse(JSON.stringify(this.currentClient));
    this.savedEntries = [ ...this.savedEntries.filter(e =>
      (e.tenant.tenant === newEntry.tenant.tenant && e.tenant.newTenantName === newEntry.tenant.newTenantName) === false
    ),
    newEntry
  ];
  }
  
  getAllEntries() {
    return this.savedEntries;
  }

  // Module Navigation
  getNextModule(current: string): string | null {
    const mods = this.getSelectedModules();
    const idx = mods.indexOf(current);
    return idx >= 0 && idx < mods.length - 1 ? mods[idx + 1] : null;
  }
}

