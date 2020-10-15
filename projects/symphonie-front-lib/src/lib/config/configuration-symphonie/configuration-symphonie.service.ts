import { Injectable }             from '@angular/core';
import { ConfigurationSymphonie } from './configuration-symphonie.model';
import { LibConfig }              from '../lib-config';
import { defaultConfig }          from './default-config';


@Injectable({
  providedIn: 'root',
})
export class ConfigurationSymphonieService {

  private configurationSymphonie: Map<string, ConfigurationSymphonie>;

  public getKey(key: string): ConfigurationSymphonie {
    if (!this.configurationSymphonie) {
      throw new Error(` Pas de configuration chargée.`);
    }
    if (this.configurationSymphonie[key])
      return this.configurationSymphonie[key];
  }

  public getBaseUrl() {
    if (!this.configurationSymphonie) {
      throw new Error(` Pas de configuration chargée.`);
    }
    return this.configurationSymphonie['baseUrl'].valeur;
  }


  /*
  * On utilise XMLHttpRequest plutôt que HttpClient
  * cf : https://sebastienollivier.fr/blog/angular/pourquoi-il-ne-faut-pas-utiliser-httpclient-dans-appinitializer
  */
  public initialiseConfiguration(libConfig: LibConfig) {
    return new Promise((resolve, reject) => {

        //Si on est en DEV on a pas accès a la base de donnée de Symphonie
        if (libConfig.env() === 'dev') {
          // @ts-ignore
          this.configurationSymphonie = defaultConfig;

          resolve(defaultConfig)

        } else {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', '/tempo-api/configuration-symphonie');

          xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              this.configurationSymphonie = JSON.parse(xhr.responseText);
              resolve(this.configurationSymphonie);

            } else if (xhr.readyState === XMLHttpRequest.DONE) {
              console.error('[symphonie-front-lib] - Configuration - Impossible de charger la configuration symphonie issue de la base Tempo');
              alert('[symphonie-front-lib] - Configuration - Impossible de charger la configuration symphonie issue de la base Tempo');
              console.error(xhr);
              reject(xhr);
            }
          });

          xhr.send(null);
        }
      },
    );
  }
}
