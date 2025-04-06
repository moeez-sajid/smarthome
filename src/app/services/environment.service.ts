import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private env: any;

  constructor(@Inject('ENV_VARS') private envVars: any) {
    this.env = envVars;
  }

  get apiUrl(): string {
    return this.env.apiUrl;
  }

  get baseUrl(): string {
    return this.env.baseUrl;
  }

  get siteName(): string {
    return this.env.siteName;
  }

  get siteDescription(): string {
    return this.env.siteDescription;
  }

  get defaultImage(): string {
    return this.env.defaultImage;
  }

  get production(): boolean {
    return this.env.production;
  }
} 