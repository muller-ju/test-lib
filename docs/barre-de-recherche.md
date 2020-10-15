# Composant da barre de recherche

Ce composant permet de proposer une barre de rechercher générique pour les applications symphonies.

## header

Pour l'inclure, ajouter dans le fichier html la ligne :
```
  <symphonie-barre-recherche (lancerRechercheEmitter)="rechercher($criteriasList)" (resetRechercheEmitter)="resetRecherche()">
    ... directives listant les critères de recherche ...
  </symphonie-barre-recherche>
```
Il émet en sortie: 
- l'évènement `(lancerRechercheEmitter)` qui fournit la liste identifiant des critères et les valeurs sélectionnées
- l'évènement `(resetRechercheEmitter)` qui indique un RAZ des critères de recherche. Si l'évènement reset est omis alors le bouton RESET n'est pas affiché.

## Critères de recherche
Les critères de recherche indiquent les champs de rechercher à afficher et la manière de les afficher. \
Ils sont instanciés en utilisant la directive symphonie-criteria-field. 

```
    <symphonie-criteria-field id="nomPropriete" type="text" libelle="Nom de la propriété">
        ... specific criteria ...
    </symphonie-criteria-field>
```

Propriétés:

- id: l'identifiant du champ sur lequel on applique le filtre
- type: indique l'affichage à utiliser; actuellement les valeurs possibles sont text, enum et list
- libelle: description qui sera affiché dans le placeholder; il est optionnel
- divClass: classes de style à apporter à la colonne bulma du critère; il est optionnl 
- objectClass: classes de style à apporter à l'objet de saisie du critère; par défaut 'input is-size-7';

### Saisie libre du critère : type == 'text'

Saisie libre, pour ce faire insérer une directive symphonie-criteria-field avec comme type "text".\
Un input sera affiché pour saisir le critère. 

```
    <symphonie-criteria-field id="nomPropriete" type="text" libelle="Nom de la propriété"></symphonie-criteria-field>
```

Propriétés:

- id:  l'identifiant du champ sur lequel on applique le filtre
- type: "text" indique une saisie libre

### Saisie d'une date comme critère : type == 'date'

Saisie utilisant un date picker html5, pour ce faire insérer une directive symphonie-criteria-field avec comme type "date".\
Un input sera affiché pour saisir le critère.   

```
    <symphonie-criteria-field id="nomPropriete" type="date" libelle="Nom de la propriété"></symphonie-criteria-field>
```

Propriétés:

- id: l'identifiant du champ sur lequel on applique le filtre
- type: "date" indique l'utilisation d'un date picker
- libelle: si renseigné affichage en tant que placeholder (attention bidouille HTML5: affichage sous type=text puis sur focus on passe en type=date)

### Sélection du critére dans un liste issue d'un tableau d'objet : type == 'select'

Liste de choix basé sur un tableau, pour ce faire insérer une directive symphonie-criteria-field avec comme type "select".
Ajouter une sous-directive qui permettra de renseigner le tableau d'objet et la manière de constituer la liste de choix.

```
    <symphonie-criteria-field id="categorieGlobale" type="select" libelle="Catégorie Globale" >
      <symphonie-select-criteria [elements]="categoriesList" keyFieldName="id" valueFieldName="libelle"></symphonie-select-criteria>
    </symphonie-criteria-field>
```

Propriétés symphonie-criteria-field:

- id: l'identifiant du champ sur lequel on applique le filtre
- type: "select" indique un affichage sous la forme de liste de choix
- libelle: un choix non sélectionnable sera ajoutée avec le descriptif  

Propriétés symphonie-select-criteria:
- elements: le tableaux d'éléments servant de source à la liste de choix
- keyFieldName: nom du champ contenant la valeur du critère qui sera retournée lors du lancement de la recherche  
- valueFieldName: nom du champ contenant la valeur à afficher

### Sélection du critére dans un liste issue d'un tableau d'objet : type == 'enum'

Liste de choix basé sur une enum, pour ce faire insérer une directive symphonie-criteria-field avec comme type "enum".
Ajouter une sous-directive qui permettra de renseigner l'enum.
```
    <symphonie-criteria-field id="familleOffre" type="enum" libelle="Famille d'offre">
        <symphonie-enum-criteria [enum]="domainesEnum"></symphonie-enum-criteria>
    </symphonie-criteria-field>
```

Propriétés symphonie-criteria-field:

- id: l'identifiant du champ sur lequel on applique le filtre
- type: "enum" indique un affichage sous la forme de liste de choix
- libelle: un choix non sélectionnable sera ajoutée avec le descriptif  

Propriétés symphonie-enum-criteria:

- enum: l'enum servant de source aux éléments à afficher 

### Sélection du critére dans un liste issue d'un tableau : type == 'list'

Liste de choix basé sur une enum, pour ce faire insérer une directive symphonie-criteria-field avec comme type "list".
Ajouter une sous-directive symphonie-list-criteria qui permettra de renseigner la liste.

```
    <symphonie-criteria-field id="id" type="list">
        <symphonie-list-criteria [list]="myList"></symphonie-enum-criteria>
    </symphonie-criteria-field>
```

avec 

```
    let myList = ['choix 1','choix 2','choix 3'];
```

ou indiquer directement les valeurs:

```
    <symphonie-criteria-field id="id" type="list">
        <symphonie-list-criteria values="value1;value2;value3"></symphonie-enum-criteria>
    </symphonie-criteria-field>
```

Propriétés symphonie-criteria-field:

- id: l'identifiant du champ sur lequel on applique le filtre
- type: "list" indique un affichage sous la forme de liste de choix
- libelle: un choix non sélectionnable sera ajoutée avec le descriptif  

Propriétés symphonie-list-criteria:

- list: la liste servant de source aux éléments à afficher 
- values: les valeurs à afficher séparer par des ';'

## A FAIRE

### Traitements des enums avec des clés de type string
 
Les enum en javascript sont des hasmap croisées, avec comme clé implicite un number. 

```
    enum Languages{
        Java,Javascript,TypeScript,Dart
    };

    <= donne quelque chose comme =>

    Languages = {
        'Javascript' : 1,
        'TypeScript' : 2,
        'Dart'       : 3,
        1 : 'Javascript',
        2 : 'TypeScript',
        3 : 'Dart'
    };
```

Si votre valeur est une string différente de votre clé, il faudra implémenter une méthode d'extraction de clés.

```
    enum Languages{
        Javascript='berk',TypeScript='mouai',Dart='ofCourse'
    };

    <= donne quelque chose comme =>

    Languages = {
        'Javascript' : 'berk',
        'TypeScript' : 'mouai',
        'Dart'       : 'ofCourse',
        'berk'       : 'Javascript',
        'mouai'      : 'TypeScript',
        'ofCourse'   : 'Dart'
    };
```
Comment extraire les clés des valeurs ?


### Ajout d'un critère de saisie d'un nombre ?

Ajout d'un type 'number'  ?

```
    <symphonie-criteria-field id="id" type="number"></symphonie-criteria-field>
```

### Ajout d'un critère de saisie d'une datetime, time ?

Ajout d'un type 'datetime', 'time' ?

```
    <symphonie-criteria-field id="id" type="datetime"></symphonie-criteria-field>
```

### Ajout d'un critère de saisie d'un intervalle de temps ?

Ajout d'un type 'duration' ?

```
    <symphonie-criteria-field id="id" type="duration">
        <symphonie-duration-criteria type="date"></symphonie-duration-criteria>
    </symphonie-criteria-field>
```
