import capitalize from 'lodash/capitalize';

export interface Position {
  libellePosition: string;
  idPosition: string;
}

/*
 * Défnit l'utilisteur en cours de l'application.
 *
 * L'utilisateur est constitué :
 * - des informations du token JWT
 * - du token lui même
 * - de la pposition courante
 */
export class User {
  prenom: string;
  isCollaborateur: boolean;
  idCollaborateur: string;
  login: string;
  nom: string;
  roles: string[];
  positions: Position[];
  private _currentPosition: Position;
  hasResponsabiliteSalarie: boolean;
  token: string;

  constructor(
    init: { isCollaborateur: boolean, idCollaborateur: string, prenom: string, nom: string, login: string, auth: string[] | string, positions: Position[], hasResponsabiliteSalarie: boolean },
    token: string,
    currentPosition?: Position) {
    this.isCollaborateur = init.isCollaborateur;
    this.idCollaborateur = init.idCollaborateur;
    this.prenom = init.prenom;
    this.login = init.login;
    this.nom = init.nom;
    this.roles = typeof init.auth === 'string' ? init.auth.split(',') : init.auth;
    this.positions = init.positions;
    this.hasResponsabiliteSalarie = init.hasResponsabiliteSalarie;
    this._currentPosition = currentPosition;
    this.token = token;
  }

  getFullName(): string {
    return `${this.nom.toUpperCase()} ${capitalize(this.prenom)}`;
  }

  set currentPosition(currentPosition: Position) {
    this._currentPosition = currentPosition;
  }

  /*
  * la position courante est:
  *  soit la position courante explicitement spécifiée,
  *  soit la première position extraite du token JWT,
  *  soit 1-ZZZ-0NA (dans le cas où il n'y aurait pas de position dans le JWT)
   */
  get currentPosition() {
    if( this._currentPosition === undefined || this._currentPosition === null){
      return this.getDefaultPosition();
    }
    return this._currentPosition;
  }

  private getDefaultPosition() {
    if (this.positions === null || this.positions === undefined || this.positions.length > 0) {
      return this.positions[0];
    }else{
      // Why Loïc ? Why ?....
      return  {idPosition: '1-ZZZ-0NA', libellePosition: 'Pas de position'};
    }
  }

  setPositions(positions: Position[]) {
    this.positions = positions;
  }
}
