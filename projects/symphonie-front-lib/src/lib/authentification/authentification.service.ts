import { HttpClient, HttpHeaders }     from '@angular/common/http';
import { Inject, Injectable }          from '@angular/core';
import { JwtHelperService }            from '@auth0/angular-jwt';
import { Position, User }              from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map }                         from 'rxjs/operators';
import { LibConfig, LibConfigService } from '../config/lib-config';
import { OngletsService }              from '../onglets/onglets.service';
import { UserRepository }              from './user-repository.service';
import { UserFactoryService }          from './user-factory.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly jwtHelperService = new JwtHelperService();
  redirectUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(LibConfigService) private config: LibConfig,
    private readonly ongletsService: OngletsService,
    private userRepository: UserRepository,
    private userFactory: UserFactoryService
  ) {
    const user: User = this.userRepository.getUser();
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    this.userRepository.removeUser();
    localStorage.removeItem('positions');
    this.ongletsService.removeClosableOnglets();
    this.currentUserSubject.next(null);
  }

  public updateToken(res) {
    this.logout();
    if (res.id_token) {
      const user = this.userFactory.createNewUser(res.id_token);
      this.userRepository.saveUser(user);
      this.currentUserSubject.next(user);
    }
  }

  changeCurrentPosition(position: Position) {
    const user = this.userRepository.changePosition(position);
    if(user){
      this.currentUserSubject.next(user);
    }
  }

  public createHeaders(): { headers: HttpHeaders } {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token != null) {
      headers = headers.append('Authorization', `Bearer ${token}`);
      headers = headers.append('Content-Type', 'application/json');
    }
    return {headers};
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();
    return user && !this.jwtHelperService.isTokenExpired(user.token);
  }

  getAuthToken(): string {
    return this.getUser().token
  }

  public getUser() {
    return this.userRepository.getUser();
  }

  login(userName: string, password: string): Observable<void> {
    const authHeaderPart = `${userName}:${password}`;
    const headers = new HttpHeaders({
      Authorization: `Basic ${(this.encodeUnicodeBase64(authHeaderPart))}`,
      'Content-Type': 'x-www-form-urlencoded',
    });
    const body = null;
    return this.http.post(this.config.authenticateApiUrl, body, {headers})
      .pipe(
        map(res => this.updateToken(res)),
      );
  }

  private encodeUnicodeBase64(value: string): string {
    return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  hasRole(role: string) {
    return this.currentUserValue.roles.includes(role);
  }

  isAdmin() {
    return this.hasRole('ROLE_HM_SYMPHONIE_ADMIN');
  }
}
