import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HeaderService}           from './header.service';
import {User}                    from '../authentification/user';
import {AuthentificationService} from '../authentification/authentification.service';
import {LibConfig, LibConfigService} from '../config/lib-config';
import {ConfigurationSymphonieService} from '../config/configuration-symphonie/configuration-symphonie.service';
import {UtilsService} from '../utils/utils.service';


@Component({
  selector: 'symphonie-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuIsOpen = false;
  isModalChoixPositionOpened = false;
  numeroPropositions: string;
  numeroJuridique: string;
  currentUser: User;
  @Output() onClickVersion = new EventEmitter();
  isDev: boolean;


  constructor(
    private http: HttpClient,
    private router: Router,
    public authentificationService: AuthentificationService,
    public configurationSymphonie: ConfigurationSymphonieService,
    private toastr: ToastrService,
    private propositionsService: HeaderService,
    private utilsService: UtilsService,
    @Inject(LibConfigService) readonly config: LibConfig,
  ) {
    this.isDev = this.configurationSymphonie.getKey('env').valeur === 'dev';
    this.authentificationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    if( this.authentificationService.currentUserValue){
      this.authentificationService.currentUserValue.roles.push("ROLE_HM_SYMPHONIE_ADMIN");
    }
  }

  logout() {
    this.authentificationService.logout();
    if (this.config.application === 'tempo' || this.config.env() === 'dev') {
      this.router.navigateByUrl('/login');
    } else {
      window.location.replace(this.configurationSymphonie.getBaseUrl() + '/tempo/login');
    }
  }

  openMenu() {
    if (this.authentificationService.isAuthenticated()) {
      this.menuIsOpen = true;
    }
  }

  closeMenu() {
    this.menuIsOpen = false;
  }

  goTo(keyUrl: string, newWindow = false) {

    const key = this.configurationSymphonie.getKey(keyUrl);
    if (this.config.env() === 'dev' && key.applicationTarget !== this.config.application) {
      return;
    }
    this.utilsService.navigate(key.valeur, newWindow, key.applicationTarget).then(
      () => this.closeMenu(),
    );
  }

  goToCcn() {
    this.utilsService.navigate('https://harmoniemutuelle.sharepoint.com/relationadherents/grandscomptesccn', true, "other");
  }

  goToMarcheCollectif() {
    this.utilsService.navigate('https://harmoniemutuelle.sharepoint.com/relationadherents/marchecollectif/sante/pages/default.aspx', true, "other");
  }


  searchPropo() {
    this.numeroPropositions = this.numeroPropositions.trim();
    if (this.numeroPropositions.charAt(0) === 'S') {
      this.propositionsService.getProposition(this.numeroPropositions).subscribe(
        (propositions: any) => window.location.replace(propositions.url),
        (error) => this.handleError(error));
    } else {
      this.toastr.warning('Attention cette proposition a été initialisée dans GRC, merci de continuer dans l\'outil GRC Siebel', 'Attention');
    }
  }

  searchContrat() {
    this.numeroJuridique = this.numeroJuridique.trim();

    this.propositionsService.getContrat(this.numeroJuridique).subscribe(
      (contrat: any) => window.location.replace(contrat.url),
      (error) => this.handleError(error));
  }

  private handleError(error) {
    if (error.status === 404) {
      this.toastr.error('Contrat non trouvé', 'Erreur');
    } else {
      this.toastr.error('Une erreur est survenue.', 'Erreur !');
    }
  }

  hasAccessToControleMedical() {
    return this.currentUser.positions===undefined?false:this.currentUser.positions.map(p => p.libellePosition).findIndex(
      (p) => p.includes("CONTROLE MEDICAL"),
    ) != -1;
  }

  roleAdmin() {
    this.authentificationService.isAdmin() ? this.authentificationService.currentUserValue.roles=this.authentificationService.currentUserValue.roles.filter(role => role != "ROLE_HM_SYMPHONIE_ADMIN") : this.authentificationService.currentUserValue.roles.push("ROLE_HM_SYMPHONIE_ADMIN");
  }

  openModalChoixPosition() {
    this.currentUser.setPositions(JSON.parse(localStorage.getItem('positions')));
    this.isModalChoixPositionOpened=!this.isModalChoixPositionOpened;
  }
}
