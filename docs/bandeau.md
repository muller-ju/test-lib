# Bandeau Symphonie commun
Visuellement, l'objectif de cette bibliothèque est de donner l'illusion d'un front unique pour l'ensemble des applications
de la suite Symphonie. Pour cela, elle déclare :
- Le composant "header", qui contient le bandeau ainsi que le menu de gauche dépliable
- Les composants "onglets", qui s'occupent de la gestion des onglets internes

## Header
Pour l'inclure, il suffit d'ajouter dans le fichier `app.component.html` la ligne :
```
<symphonie-header (onClickVersion)="..." ></symphonie-header>
```
Il émet en sortie l'évènement `onClickVersion` (cf. [doc sur l'icône de version](icone_version.md))

Pour en savoir plus sur le menu de gauche et les liens auxquels il fait référence : voir [doc sur la configuration](configuration.md#ConfigurationSymphonieService)

## Le système d'onglets
Pour ajouter la barre d'onglets internes, il faut écrire dans un fichier html :
```
<symphonie-onglets></symphonie-onglets>
```

Pour gérer son contenu (stocké dans le sessionStorage), il faut tout d'abord injecter le service exposé `OngletsService` par la lib.
Par exemple :
```
constructor(
    private readonly ongletService: OngletsService,
  ) {}
```
Il est alors possible d'utiliser notamment les méthodes :
- `onglets()` afin de récupérer tout le contenu de la barre d'onglets. **L'objet retourné est de type Observable**
- `createOnglet()` pour créer un objet `Onglet` avec les paramètres :
    - `id` (string) : un identifiant d'onglet
    - `path` (string) : la route a appelé lorsque l'on clique sur l'onglet
    - `label` (string) : le texte a affiché dans l'onglet
    - `icon` (string[]) : l'icône [FontAwesome](https://github.com/FortAwesome/angular-fontawesome)
    à afficher à côté du label, sous la forme `[prefix, iconName]` (ex. `['far', 'file']`)
    _Attention : s'il s'agit d'une nouvelle icône, elle doit être importée dans la lib pour être affichable_
    - `markAsSelected` (boolean) : **facultatif**. Indique si l'onglet doit être stylisé comme selectionné à la création (vrai par défaut) 
- `addOnglet(onglet: Onglet)` pour ajouter à la barre d'onglets l'objet passé en paramètre
- `exist(ongletId)` pour vérifier si un onglet existe en passant son identifiant en paramètre
- `removeOngletById(id)` pour supprimer un onglet existant en passant son identifiant en paramètre
