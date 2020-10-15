import { InjectionToken } from '@angular/core';

export interface LibConfig {
  application : string;
  env :  () => string;
  surchargePosition?: [{libellePosition:string, idPosition: string}],
  authenticateApiUrl : string;
  cfgUrl : () => string;
}

export const LibConfigService = new InjectionToken<LibConfig>(
  'LibConfig'
);
