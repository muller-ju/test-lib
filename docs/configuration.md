# Configuration
L'utilisation de la librairie est soumis à la mise en place d'éléments de configuration qui seront brièvement expliqués ci-dessous.

## LibConfig
Il s'agit de l'objet à passer en paramètre lors de l'import de la librairie dans le fichier `app.module.js`
de l'application consommatrice, [par exemple](https://github.com/hm-it/tempo-front/blob/master/src/app/app.module.ts) :
```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SymphonieFrontLibModule.forRoot(
      {
        application: 'tempo',
        env: getEnv,
        authenticateApiUrl: ApiConfig.AUTHENTICATE,
        cfgUrl: getUrlConfig,
      }
    ), ...
```
Son interface se situe dans le fichier `lib-config.ts` (elle est également exposée par la librairie) et est composé des propriétés :
- `application` : string du nom de l'application consommatrice (ex. `'tempo'`)
- `env` : signature d'une fonction qui retourne l'environnement où est déployé l'application (cf. `getEnv` [de l'exemple](https://github.com/hm-it/tempo-front/blob/master/src/app/app.module.ts))
- `surchargePosition` : **facultatif**. tableau de string comprenant le libellé et l'id d'une position. Ces informations sont normalement
fournies par Tempo cependant pour le développement en local il faut les mocker. 
- `authenticateApiUrl` : string de l'URL de l'endpoint pour l'authentification (ex. `/tempo-api/api/authenticate`)
- `cfgUrl` : signature d'une fonction qui retourne l'URL du fichier de configuration de l'application consommatrice (soit `Constants.CONFIG_FILE_NAME`, cf. `getUrlConfig` [de l'exemple](https://github.com/hm-it/tempo-front/blob/master/src/app/app.module.ts))


## ConfigurationJson
Situé dans `configuration.service.ts` et utilisé dans `symphonie-front-lib.module.ts`, il s'agit de l'objet qui charge
la configuration de l'application consommatrice.

Pour plus d'informations, rendez vous sur la documentation du [framework HM](https://github.com/hm-it/fwk-angular-hm-front)
ou du [seed Angular](https://github.com/hm-it/seed-angular-front)

## ConfigurationSymphonieService
Situé dans `configuration-symphonie.service.ts` et utilisé dans `symphonie-front-lib.module.ts`, il s'agit de l'objet
permettant de récupérer les URLs du menu (`header.component.html`) qui sont configurées en base de données.

La table en question, nommée `configuration_symphonie` est hébergée par la base de Tempo et à la structure suivante :
- `code` : un identifiant de ligne (ex. `aviseUrl`)
- `application_target` : l'application à ouvrir au clic du lien (ex. `maestro`). S'il s'agit d'une application hors Symphonie, la valeur `other`.
Le code `baseUrl` étant un élément commun, il prend la valeur `all`
- `description` : une description plus étendue
- `libelle` : texte du lien cliquable dans le menu (ex. `Recherche d'une proposition`)
- `valeur` : url à appeler par le lien

Cependant, durant le développement en local, la plupart des applications n'ont pas accès à la base de données Symphonie (accesible via tempo-api).
Pour cela, le fichier `default-config.ts` contient un mock de la configuration.

## Configuration des environnemments
Sur chaque tempo des environnements, l'url /tempo/admin/configuration permet de manipuler la table de configuration `configuration_symphonie`.

Les valeurs renseignables correspondent à celle de la table :
- `code` : un identifiant de ligne (ex. `aviseUrl`)
- `application` : l'application à ouvrir au clic du lien (ex. `maestro`). S'il s'agit d'une application hors Symphonie, la valeur `other`. Le code `baseUrl` étant un élément commun, il prend la valeur `all`
- `description` : une description plus étendue
- `libelle` : texte du lien cliquable dans le menu (ex. `Recherche d'une proposition`)
- `valeur` : url à appeler par le lien
