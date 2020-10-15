import { User }                        from './user';
import { JwtHelperService }            from '@auth0/angular-jwt';
import { HttpErrorResponse }           from '@angular/common/http';
import { Inject, Injectable }          from '@angular/core';
import { LibConfig, LibConfigService } from '../config/lib-config';

@Injectable({providedIn: 'root'})
export class UserFactoryService {

  private readonly jwtHelperService = new JwtHelperService();

  constructor(@Inject(LibConfigService) private config: LibConfig) {
  }

  /*
   * Permet de créer et de valider un User à partir d'un token.
   *
   * Un nouveau User est valide quand:
   *  - le token jwt est valide
   *  - l'utilisateur appartient à GRC
   *
   * ATTENTION: Cette méthode ne permet pas d'enregistrer un User (voir UserRepository)
   * Cette méthode n'est appelé que lors de l'authentification d'un utilisateur.
   * Dans ce cas il n'y a pas de position courante.
   *
   * Dans un environnement de dev, des positions sont ajoutés pour permettre de tester.
   *
   * FIXME: mais que c'est cracra:
   *  lorsqu'on demande au service /login et on nous répond OK mais pas trop c'est à toi de voire en fonction du fichier de config dev
   *  du coup on prend la réponse pour jeter de fausses erreurs HTTP 500 (d'ailleurs devrait plutôt être 403)
   *  2 options:
   *  - être courageux et démélé ce merdier
   *  -  attendre keycloak: il va nous obliger à rationaliser ce bousin
   */
  createNewUser(token: string): User {
    const decodedPayload = this.jwtHelperService.decodeToken(token);
    this.assertDecodedPayloadIsValid(decodedPayload);
    this.assertUserIsInGrc(decodedPayload);
    if (this.config.env() === 'dev') {
      this.mockDevInformations(decodedPayload);
    }
    return new User(decodedPayload, token);
  }

  private mockDevInformations(decodedPayload) {
    if (!decodedPayload.positions) {
      if (this.config.surchargePosition) {
        decodedPayload.positions = this.config.surchargePosition;
      } else {
        decodedPayload.positions = [
          {
            'libellePosition': 'AG 37 TOURS CENTRE',
            'idPosition': '1-ATW-211'
          }, {
            'libellePosition': 'DEVELOPPEMENT',
            'idPosition': '1-1E1-196'
          }, {
            'libellePosition': 'DGP 22 CONTROLE MEDICAL',
            'idPosition': '1VKHMX'
          }
        ]
      }
    }
    decodedPayload.isCollaborateur = true;
  }

  private assertUserIsInGrc(decodedPayload: any) {
    if (!decodedPayload.isCollaborateur || decodedPayload.positions[0].idPosition === '1-ATW-43') {
      throw new HttpErrorResponse({status: 500, error: 'not_in_grc'});
    }
  }

  private assertDecodedPayloadIsValid(decodedPayload: any) {
    if (decodedPayload.identificationServerError) {
      throw new HttpErrorResponse({status: 500, error: 'api_crm'});
    }
  }
}
