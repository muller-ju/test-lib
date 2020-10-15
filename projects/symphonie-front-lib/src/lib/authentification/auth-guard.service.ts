import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConfigurationSymphonieService } from '../config/configuration-symphonie/configuration-symphonie.service';
import { AuthentificationService } from './authentification.service';
import {
  LibConfig,
  LibConfigService
} from '../config/lib-config';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate{


  constructor(private readonly authentificationService : AuthentificationService,
              @Inject(LibConfigService) private config: LibConfig,
              private readonly router: Router,
              private readonly configurationSymphonie: ConfigurationSymphonieService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authentificationService.redirectUrl = state.url;
    if (this.authentificationService.isAuthenticated()) {
      return true;
    } else {
      if (this.config.env() === 'dev') {
        this.router.navigateByUrl('/login');
      } else {
        const symphonieToken = route.queryParams['symphonie-token'] ? '&symphonie-token=' + route.queryParams['symphonie-token'] : '';
        window.location.replace(`${this.configurationSymphonie.getBaseUrl()}/tempo/login?returnUrl=${encodeURIComponent(window.location.href)}${symphonieToken}`);
      }
      return false;
    }
  }
}

