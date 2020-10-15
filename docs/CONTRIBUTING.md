# Contribuer au projet

## Conventions de code 
 
- Respecter les règles de bonnes pratiques [Angular](https://angular.io/guide/styleguide) (cf. [seed front](https://github.com/hm-it/seed-angular-front)) et de [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-structuring-your-code.html) (cf. [seed back](https://github.com/hm-it/seed-springboot-back)). 
- Nous cherchons à suivre [les recommandations Angular de Cyril Tuzi](https://medium.com/@cyrilletuzi/architecture-in-angular-projects-242606567e40).
- Respecter les conventions d'écriture des langages utilisés (par exemple [Java](https://google.github.io/styleguide/javaguide.html) ou [TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)) 
- Limiter et réfléchir à l'utilisation de commentaires : obsolescence, paraphrase du code, paraphrase de `git` (`@author...`)
- Éviter tout code mort, cassé ou commenté
- Penser à des tests : [manuels, automatisés, unitaires, d'intégration, de bout en bout](https://blog.octo.com/la-pyramide-des-tests-par-la-pratique-1-5/), pertinents et maintenables
- Intégrer de [la revue de code](https://dzone.com/articles/4-types-of-code-reviews-any-professional-developer)
- Envisager des [Architectural Decision Records](https://harmoniemutuelle.sharepoint.com/sites/usine-logicielle/SitePages/Bonnes%20Pratiques/Cr%C3%A9er%20un%20ADR.aspx)

Rester néanmoins pragmatique et solliciter différents avis (développeurs, GAP, architectes...).

## Style de code 

### front
Style par défaut ("Reformat code" dans intelliJ, cf. également `.editorconfig`) sauf, à configurer via Settings > Code Style > TypeScript : 
- Typescript/Spaces/ES6 Import/Export Braces
- Typescript/Spaces/Object Literal type braces
- Typescript/Wrapping and braces/ES6 import/export => Align 'from' clauses
- Typescript/Punctation => Use single quotes always

### api
Style par défaut d'intelliJ (cf. également `.editorconfig`).

## Gestion des imports 

### front

- Au lieu de : 
    ```js 
    import * as _ from 'lodash'; 
    ```
    préférer 
    ```js 
    import isEmpty as from 'lodash/isEmpty'; 
    ```
    de manière à limiter la taille du bundle généré. 


## Utilisation de git 

Les contributions se font sur une branche principale, `master`, suivant l'approche ["trunk based development"](https://trunkbaseddevelopment.com/).

###  Conventions de commit

Les commits suivent les conventions suivantes : 
- ils sont unitaires et relatifs à un sujet unique
- en langue française (sauf les "types")
- suivent essentiellement les [guidelines Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) 
    - le type est **obligatoire** (ex : `feat:`)
    - le "scope" : module/thème, **facultatif** (ex : `(bandeau personne physique)`)
    - le sujet est **obligatoire** (ex : `ajout du bloc "Foyer"`)
    - la référence à une Calipso (ex : `(Calipso 123984)`) ou à une user story (ex : `US-SA230`) est **facultative**     
    - un corps, séparé par une ligne vide, **facultatif**

Exemple :
```
feat(bandeau personne physique): ajout du bloc "Foyer" (Calipso 123984)

Ajout d'un lien cliquable vers la GRC. 
Modification de l'affichage du détail des personnes composant le foyer.
```

Les commits sont contrôlés avec [`commitlint`](https://commitlint.js.org). Note : attention aux deux points sur `<type>: <subject>` (chaque espace ou absence d'espace est significatif).
L'outil s'installe avec un `npm install` front et back (ex. pour tempo-api à faire dans git-hook).

#### Quelques précisions supplémentaires

- les éléments de type "configuration" (properties, dépendances...) : sont de type `feat` ou `fix`
- les contributions de SQL sont de type `feat` ou `fix`
- les corrections Sonar sont de type `style`, `refactor`, `fix` en fonction de leur nature
- utiliser `fix` de préférence pour correction d'un bug (par exemple référencé par une Calipso) ou d'un build cassé

### Rebase par défaut 

Utiliser [le `pull --rebase` par défaut](https://coderwall.com/p/tnoiug/rebase-by-default-when-doing-git-pull) pour avoir un historique plus linéaire et éviter les commits de merge sur la même branche.

### Qualimétrie 

La contribution doit passer le [test de qualimétrie](http://pichm/sonar) depuis [l'outil d'intégration continue](http://pichm/jenkins2/blue/) (voir documentation de [l'usine logicielle](https://harmoniemutuelle.sharepoint.com/sites/usine-logicielle/SitePages/Accueil.aspx)).
