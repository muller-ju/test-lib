import { Injectable }       from '@angular/core';
import { Position, User }   from './user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({providedIn: 'root'})
export class UserRepository {

  private readonly LOCAL_STORAGE_CURRENT_POSITION_FIELD = 'current-position';
  private readonly CURRENT_USER_TOKEN_KEY = 'current-user-token-symphonie';

  private readonly jwtHelperService = new JwtHelperService();

  getUser(): User | null {
    const token = localStorage.getItem(this.CURRENT_USER_TOKEN_KEY);
    //Cas première connexion
    if( token === null){
      return null;
    }
    const init = this.jwtHelperService.decodeToken(token);
    return new User(init, token, this.getActualPosition() );
  }

  saveUser(user: User) {
    localStorage.setItem(this.CURRENT_USER_TOKEN_KEY, user.token);
    localStorage.setItem(this.LOCAL_STORAGE_CURRENT_POSITION_FIELD, JSON.stringify(user.currentPosition));
  }

  changePosition(position: Position) {
    localStorage.setItem(this.LOCAL_STORAGE_CURRENT_POSITION_FIELD, JSON.stringify(position));
    return this.getUser();
  }

  getActualPosition(): Position {
    const currentPositionInLocalStorage = localStorage.getItem(this.LOCAL_STORAGE_CURRENT_POSITION_FIELD);
    if (currentPositionInLocalStorage == null) {
      return undefined;
    }
    try {
      return JSON.parse(currentPositionInLocalStorage);
    } catch (e) {
      localStorage.removeItem(this.LOCAL_STORAGE_CURRENT_POSITION_FIELD);
      return undefined;
    }
  }

  removeUser() {
    localStorage.removeItem(this.CURRENT_USER_TOKEN_KEY);
    localStorage.removeItem(this.LOCAL_STORAGE_CURRENT_POSITION_FIELD);
  }
}
