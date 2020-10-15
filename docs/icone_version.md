# Fenêtre de version
Le bandeau de Symphonie contient une icône "i" permettant initialement d'ouvrir une fenêtre détaillant des informations
concernant l'application en question. Cependant, c'est désormais la liv qui porte cette icône étant, et ne peut plus
accèder directement à ces informations.

Le choix actuellement retenu est de laisser la responsabilité à chaque application l'implémentation de sa fenêtre.

C'est pour cela que l'icône emet une valeur : ``(click)="onClickVersion.emit(true)``. Ainsi, chaque application
peut intercepter l'évènement et y implémenter une solution au sein du composent où se situe [le header fourni](bandeau.md#Header) 
(par ex. `app-component.html` et `app-component.ts`)
