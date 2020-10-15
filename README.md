# Symphonie front lib

## Contexte
Symphonie est une suite applicative maintenue par le service Offres Distribution et Souscription.
Elle a pour rôle d'être le nouvel outil pour le parcours de Souscription et est composée des briques applicatives :
- Tempo : le suivi des propositions
- aDDAgio : le recueil du besoin
- Maestro : la souscription individuelle
- Contralto : la souscription collectif

## Objectifs
Chaque brique étant dévelopée par des sous-ensembles de personnes différentes mais répondant à une entité commune,
cette librairie permet de rassembler les élements à partager en commun au sein de Symphonie.

Cette librairie est conçue pour les parties front (Angular) des applicatifs.

Afin d'avoir des interfaces les plus similaires possibles, il est nécessaire de suivre
[des concepts UI/UX communs](https://harmoniemutuelle.sharepoint.com/:p:/s/sharelock/projets/EX3H3YmcmV9Is0b89_eC1TUBag9rv7ruX1tDgeBfoUCNgg?e=4MGPRQ)
en important et utilisant le CSS à disposition dans `styles/style-symphonie.scss` au sein de chaque application.

## Récapitulatif des versions

Pour suivre les changements entre les versions, [un CHANGELOG est disponible](CHANGELOG.md)

| Numéro | Fonctionnalités |
| ------ | ----------- |
| 1.0.0  | - Mise en place du header <br> - Liens vers les différentes apps dans le menu de gauche <br> - Gestion des onglets <br> - Début de CSS communs|
| 1.1.0  | - Ajout d'une recherche dans le menu de gauche <br> - Changement lié à l'authentification avec Avisé |
| 1.2.0  | ... |

## Documentation technique

Pour une documentation plus détaillée techniquement, consulter cette [documentation](docs)
