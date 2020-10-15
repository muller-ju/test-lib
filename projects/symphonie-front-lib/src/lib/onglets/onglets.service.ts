import { Inject, Injectable }            from '@angular/core';
import { LibConfig, LibConfigService }   from '../config/lib-config';
import { Onglet }                        from './onglet';
import { BehaviorSubject }               from 'rxjs';
import { Router }                        from '@angular/router';
import { ConfigurationSymphonieService } from '../config/configuration-symphonie/configuration-symphonie.service';

@Injectable({
  providedIn: 'root',
})
export class OngletsService {

  idOngletSelected = 'recherche';

  private _onglets;

  get onglets() {
    return this._onglets.asObservable();
  }

  constructor(@Inject(LibConfigService) private config: LibConfig, private router : Router, private configurationSymphonie : ConfigurationSymphonieService) {
    const defaultOnglets = [];
    if(config.env() !== 'dev') {
      defaultOnglets.push({
        'origin': 'tempo', 'id': 'recherche', 'label': 'Recherche', 'path': '/recherche', 'icon': ['fas', 'home'],})
    }
    this._onglets = new BehaviorSubject<Onglet[]>(JSON.parse(sessionStorage.getItem('onglets')) || defaultOnglets);
    this._onglets.subscribe(
      () => sessionStorage.setItem("onglets", JSON.stringify(this._onglets.value)),
    )
  }

  /**
   * Permet d'ajouter un Onglet
   * @param id
   */
  addOnglet(onglet: Onglet) {
    onglet.origin = this.config.application;
    this._onglets.next([...this._onglets.getValue(), onglet]);
  }

  getOnglet(id: string): Onglet {
    if (!id.includes(this.config.application)) {
      id = this.config.application + '_' + id;
    }

    const ongletArray = [...this._onglets.getValue()];
    return ongletArray.find((item) => item.id === id);
  }

  updateOnglet(onglet : Onglet) {
    const ongletArray = [...this._onglets.getValue()];
    const ongletFound : Onglet = ongletArray.find((item) => item.id === this.config.application + '_' +onglet.id);
    if(ongletFound) {
      ongletFound.icon = onglet.icon;
      ongletFound.label = onglet.label;
      ongletFound.path = onglet.path;
    }
  }

  closeOnglet(ongletId : string, routing : boolean = false) {
    ongletId = this.config.application + '_' + ongletId;
    if(routing) {
      this._closeOnglet(ongletId);
    } else {
      this._removeOngletById(ongletId);
    }
  }

  closeCurrentOnglet(routing : boolean = false) {
    if(routing) {
      this._closeOnglet(this.idOngletSelected);
    } else {
      this._removeOngletById(this.idOngletSelected);
    }
  }

  /**
   * Ferme un onglet
   * S'il reste un onglet on réouvert le précédant dans la liste
   * Sinon on est redirigé la racine du site
   * @param ongletId
   */
  _closeOnglet(ongletId) {
    const indexToOpen = this._onglets.getValue().indexOf(this._onglets.getValue().find(o => o.id === ongletId)) - 1;
    this._removeOngletById(ongletId);
    if (this.idOngletSelected === ongletId) {
      if (indexToOpen >= 0) {
        if (this._onglets.getValue()[indexToOpen].origin === this.config.application) {
          this.router.navigateByUrl(this._onglets.getValue()[indexToOpen].path);
        } else {
          window.location.assign(this.configurationSymphonie.getBaseUrl() + '/' + this._onglets.getValue()[indexToOpen].origin + '/' + this._onglets.getValue()[indexToOpen].path);
        }
      } else {
        this.router.navigateByUrl('/', { skipLocationChange: true });
      }
    }
  }


  /**
   * Permet de fermer un onglet par son ID.
   * Cela ne le supprime que du tableau des onglets, il n'y a pas de redirection de faite
   * @param id
   */
  _removeOngletById(id) {
    const ongletArray = [...this._onglets.getValue()];
    const indexOnglet = ongletArray.findIndex((item) => item.id === id);
    if (indexOnglet >= 0) {
      ongletArray.splice(indexOnglet, 1);
    }
    this._onglets.next(ongletArray);
  }

  /**
   * Permet de fermer les onglets fermeable
   */
  removeClosableOnglets() {
    const ongletArray = [...this._onglets.getValue()];
    ongletArray.splice(1);
    this._onglets.next(ongletArray);
  }

  /**
   * Permet de marquer un onglet comme selectionné
   * Un seul onglet a la fois peut être sélectionné
   * @param Onglet
   */
  _markAsSelected(onglet: Onglet) {
    this.idOngletSelected = onglet.id;
  }

  /**
   * Permet de marquer un onglet comme selectionné
   * Un seul onglet a la fois peut être sélectionné
   * @param ongletId
   */
  _markAsSelectedById(ongletId) {
    this.idOngletSelected = ongletId;
  }


  createOnglet(id: string, path: string, label: string, icon: string[], markAsSelected: boolean = true) {
    id = this.config.application + '_' + id;
    if (!this._exist(id)) {
      this.addOnglet( {
        id, path, label, icon});
    }
    if(markAsSelected) {
      this._markAsSelectedById(id);
    }
  }

  /**
   * Permet de savoir si un onglet existe a partir de son id
   * @param ongletId
   * @return true si l'onglet exist, false sinon
   */
  private _exist(ongletId) {
    return this._onglets.getValue().findIndex((item) => item.id === ongletId) !== -1;
  }

}
