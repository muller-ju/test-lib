# SymphonieFrontLib

Pour de la documentation générale sur les bibliothèques, consulter [la documentation du seed](https://github.com/hm-it/seed-angular-front-lib#how-to) 

Pour de la documentation spécifique à Symphonie, sont à dispositions les docs suivantes :
- à propos de [la configuration](configuration.md)
- à propos de [l'authentification](authentification.md)
- à propos du [bandeau et du sytème d'onglets](bandeau.md)
- à propos du [ribbon](ribbon.md)
- à propos de [la fenêtre de version (icône i)](icone_version.md)
- à propos du [composant de pagination](pagination.md)
- à propos du [composant de barre de recnherche](barre-de-recherche.md)

## Contribuer au projet

Pour contribuer, consulter cette [documentation](https://github.com/hm-it/symphonie-front-lib/tree/master/docs/CONTRIBUTING.md).

## Développer en local

_Nous avons créé la commande `npm run build_lib` comme alias de la commande de build `ng build symphonie-front-lib`_

- Lancer la commande `npm run build_lib_watch` afin que durant le développement la librairie re-build à chaque modification.
- Ouvrir ensuite une nouvelle invite de commande pour y lancer `cd dist/symphonie-front-lib` puis `npm link`
- Il ne reste plus qu'à ouvrir le projet de l'application consommatrice de la lib et d'executer `npm link @hm/symphonie-front-lib`
puis son classique `npm start`
- Lors d'une montée de version de la lib, executer l'une des commandes `update-...` décrites dans le fichier `package.json`
