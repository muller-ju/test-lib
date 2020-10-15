# Authentification
Dans Symphonie, la mire de connexion (ainsi que le service back) correspond à celle de l'application Tempo.
Néanmoins pour le développement local, chaque module déclare son propre composant de connexion, en utilisant des éléments communs.

Les élements exposés par la librairie sont `authentification.service.ts` et `user.ts`, brièvement présentés ci-dessous.

## User
Il s'agit de l'objet représentant l'utilisateur. Il contient notamment le login et les rôles AD, les informations
de "Position" (affichées dans le header), son nom/prénom etc...
```
interface Position {
  libellePosition: string;
  idPosition: string;
}

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
```

## AuthentificationService
Il s'agit du composant service qui gère l'authentification. Il contient notamment :
- la méthode `login(userName: string, password: string)` appelant l'endpoint d'authentification fourni en paramètre (cf. [configuration](configuration.md))
et `logout()` pour se déconnecter (supprime le jeton JWT du navigateur)
- les méthodes `getAuthToken()` pour récupérer le jeton JWT et `isAuthenticated()` qui vérifie sa date d'expiration
- la propriété `currentUser` qui contient les informations de l'utilisateur (l'objet `User`).
Attention, **il s'agit d'un Observable**, c'est-à-dire qui'il faut **utiliser la méthode `subscribe`** pour le manipuler 

Pour l'utiliser, il suffit de l'injecter à votre composant Angular.
