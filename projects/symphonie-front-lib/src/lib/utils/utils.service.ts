import {Inject, Injectable} from '@angular/core';
import {LibConfig, LibConfigService} from '../config/lib-config';
import {Router} from '@angular/router';
import {ConfigurationSymphonieService} from '../config/configuration-symphonie/configuration-symphonie.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(
    @Inject(LibConfigService) private config: LibConfig,
    private configurationSymphonie: ConfigurationSymphonieService,
    private router: Router
  ) {
  }

  public isDev() {
    return this.configurationSymphonie.getKey('env').valeur === 'dev';
  }

  public isProd() {
    return this.configurationSymphonie.getKey('env').valeur === 'production';
  }

  public isPreprod() {
    return this.configurationSymphonie.getKey('env').valeur === 'preproduction';
  }

  public isProdOrPreprod() {
    return this.configurationSymphonie.getKey('env').valeur === 'production' || this.configurationSymphonie.getKey('env').valeur === 'preproduction';
  }

  /**
   *
   * @param url : L'URL vers laquelle on veut naviguer, elle peut être absolue ou relative
   * @param openInNewWindow
   * @param target : représente l'application vers laquelle on navigue. Peut-être une application Symphonie
   * (tempo, maestro, addagio, contralto) ou "other" qui représente une application hors scope Symphonie
   */
  public navigate(url, openInNewWindow: boolean = false, target?) {

    //Routage au sein de la même application
    if (target === this.config.application) {
      return this.router.navigateByUrl(url);
    } else {

      //Si on est sur une application 'symphonie'
      if (target && target !== 'all' && target !== 'other') {
        url = this.configurationSymphonie.getBaseUrl() + '/' + target + url;
      }
      if (openInNewWindow) {
        window.open(url, '_blank');
      } else {
        window.location.assign(url);
      }
    }
  }
}
