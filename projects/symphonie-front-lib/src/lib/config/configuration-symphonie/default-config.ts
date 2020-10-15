export const defaultConfig = {
  baseUrl: {
    code: 'baseUrl',
    valeur: location.origin,
    applicationTarget: 'all',
  },
  env: {
    code: 'env',
    valeur: 'dev',
    applicationTarget: 'all',
  },
  adhesionsWebUrl: {
    code: 'adhesionsWebUrl',
    valeur: '/adhesions-web',
    applicationTarget: 'tempo',
  },
  bannetteEquipe: {
    code: 'bannetteEquipe',
    valeur: '/bannettes/equipe',
    applicationTarget: 'tempo',
  },
  bannetteCollaborateur: {
    code: 'bannetteCollaborateur',
    valeur: '/bannettes/collaborateur',
    applicationTarget: 'tempo',
  },
  bannetteMedical: {
    code: 'bannetteMedical',
    valeur: '/bannettes/controle-medical',
    applicationTarget: 'tempo',
  },
  recherchePersonne: {
    code: 'recherchePersonne',
    valeur: '/recherche',
    applicationTarget: 'tempo',
  },
  rechercheProposition: {
    code: 'rechercheProposition',
    valeur: '/recherche-proposition',
    applicationTarget: 'maestro',
  },
  parametrageMaestro: {
    code: 'parametrageMaestro',
    valeur: '/parametrage/Accueil',
    applicationTarget: 'maestro',
  },
  parametrageContraltoColl: {
    code: 'parametrageContraltoColl',
    valeur: '/parametrage',
    applicationTarget: 'contralto-coll',
  },
  configurationUrl: {
    code: 'configurationUrl',
    valeur: '/admin/configuration',
    applicationTarget: 'tempo',
  },
  tarificateursDisponibles: {
    code: 'tarificateursDisponibles',
    valeur: 'cameleon,oscar-indiv,oscar-coll,contralto-sante,contralto-prevoyance,contralto-service,contralto-epargne',
    applicationTarget: 'all',
  },
};
