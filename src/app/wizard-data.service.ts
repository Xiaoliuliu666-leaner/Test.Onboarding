import { Injectable } from '@angular/core';

export interface ClientToOnboard {
  id?: string;
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
  private currentClient: ClientToOnboard = this.createEmptyClient();
  private savedEntries: ClientToOnboard[] = [];

  private createEmptyClient(): ClientToOnboard {
    return {
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
  }

  // Tenant Info
  setTenantInfo(info: {tenant?: string; newTenantName?: string; contactName: string; contactEmail: string; contactPhone: string; createdBy?: string; configNotes?: string;}) {
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
    // 深拷贝，保证回填表单不会联动原数据
    return JSON.parse(JSON.stringify(this.currentClient));
  }
  setCurrentClient(client: ClientToOnboard) {
    this.currentClient = JSON.parse(JSON.stringify(client));
  }
  resetCurrentClient() {
    this.currentClient = this.createEmptyClient();
  }

  // Data history
  saveCurrentClient() {
    // 1. 分配唯一 id Assign unique id
    if (!this.currentClient['id']) {
      this.currentClient['id'] = Date.now().toString();
    }
    const newEntry = JSON.parse(JSON.stringify(this.currentClient));
    this.savedEntries = [
      ...this.savedEntries.filter(e => e.id !== newEntry.id),
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