# Composants de pagination symphonie
Deux composants permettent d'afficher un pagineur.

- symphonie-pagination: pagineur creux
- symphonie-pagination-controlleur: pagineur permettant de gérer une source de donnée sous forme de tableau


## symphonie-pagination


Pour l'inclure, il faut d'ajouter dans le fichier html la ligne :

```
<symphonie-pagination [nbPages]="..." [currentPage]="..." (onSelectPage)="gotoPage($event)"></symphonie-pagination>
```
Les propriétés nbPages et currentPage sont des `number` avec currentPage compris entre 1 et nbPages.

Il émet en sortie l'évènement `gotoPage($event:{pageIndex:number})` avec pageIndex qui indique la page à afficher.

## symphonie-pagination-controller

Pour l'inclure, il faut d'ajouter dans le fichier html la ligne :

```
<symphonie-pagination-controller [elements]="..."  [maxResult]="..." (displayedElementsChange)="elementsDisplayedChanges($event)" ></symphonie-pagination-controller>
```

De plus il faut ajouter dans le ts, une méthode gerrant l'affichage des éléments de la pages:

```
  public elementsDisplayedChanges(e : any[]){
    this.elementsArrayToDisplay = e;
    // ou
    this.observableElementsToDisplay = of(e);
    // ces propriétés servant de source à l'affichage des éléments paginés 
  } 
```

Dans le cas où les éléments paginés sont affichés avant le composant de pagination, 
il faut ajouter forcer la détection des changements:  

```

export class MyComponent implements ..., AfterContentChecked {

  constructor(
    ...,
    private cdRef : ChangeDetectorRef
  ) {
    ...
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
```

Autrement une erreur ExpressionChangedAfterItHasBeenCheckedError sera logguée indiquant l'utilisation des éléments paginés. 
