import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthentificationService} from './authentification.service';
import {LibConfig, LibConfigService} from '../config/lib-config';

@Injectable({providedIn: 'root'})
export class AuthAdminGuardService implements CanActivate {


  constructor(private readonly authentificationService: AuthentificationService,
              @Inject(LibConfigService) private config: LibConfig
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authentificationService.redirectUrl = state.url;
    return this.authentificationService.isAuthenticated() && this.authentificationService.isAdmin();
  }
}

