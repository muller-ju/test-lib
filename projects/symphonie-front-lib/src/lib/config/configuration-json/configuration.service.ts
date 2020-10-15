import { Injectable }    from '@angular/core';
import { OptionsConfig } from './configuration.options';

@Injectable({ providedIn: 'root' })
export class ConfigurationJson {

  private configuration: OptionsConfig = { env: 'Default', logLevel: 'DEBUG' };

  constructor() {
  }

  /**
   * Méthode permettant la récupération de la valeur d'une clef de configuration.
   *
   * @param key La clef à trouver dans la configuration.
   */
  public getKey(key: string): string {
    if (!this.configuration) {
      throw new Error(` Pas de configuration chargée.`);
    }
    return (this.configuration as any)[key];
  }


  /*
  * On utilise XMLHttpRequest plutôt que HttpClient
  * cf : https://sebastienollivier.fr/blog/angular/pourquoi-il-ne-faut-pas-utiliser-httpclient-dans-appinitializer
  */
  public initialiseConfiguration(path: any) {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('GET', path);

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          this.configuration = JSON.parse(xhr.responseText);
          resolve(this.configuration);

        } else if (xhr.readyState === XMLHttpRequest.DONE) {
          console.error('[fwk-angular-hm-front] - Configuration - Unable to load configuration');
          console.error(xhr);
          reject(xhr);
        }
      });

      xhr.send(null);
    });

  }

}
