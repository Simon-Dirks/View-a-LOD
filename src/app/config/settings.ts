import { ViewMode } from '../models/view-mode.enum';
import { ViewModeSetting } from '../models/settings/view-mode-setting.enum';
import { PredicateVisibility } from '../models/settings/predicate-visibility-settings.model';
import { RenderMode } from '../models/settings/render-component-settings.type';

const imagePredicates: string[] = [
  'http://xmlns.com/foaf/0.1/depiction',
  'https://schema.org/thumbnail',
  'https://schema.org/image',
];

const typePredicates: string[] = [
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  'https://www.ica.org/standards/RiC/ontology#hasRecordSetType',
  'https://schema.org/additionalType',
  'http://www.wikidata.org/entity/P31',
];

export const Settings = {
  defaultSearchQuery: '',
  labelMaxChars: 100,
  showFilterPanel: true,
  minNumOfValuesForFilterOptionToAppear: 1,
  endpoints: {
    hua: {
      label: 'Het Utrechts Archief',
      endpointUrls: [
        {
          elastic:
            'https://api.data.netwerkdigitaalerfgoed.nl/datasets/hetutrechtsarchief/Test-Amerongen/services/Zoeken/_search',
          sparql:
            'https://api.data.netwerkdigitaalerfgoed.nl/datasets/hetutrechtsarchief/Test-Amerongen/sparql',
        },
      ],
    },
    razu: {
      label: 'RAZU',
      endpointUrls: [
        {
          elastic:
            'https://test.data.razu.nl/_api/datasets/Kasteel-Amerongen/PoC/services/PoC-2/_search',
          sparql:
            'https://api.test.data.razu.nl/datasets/Kasteel-Amerongen/PoC/sparql',
        },
        {
          sparql:
            'https://api.test.data.razu.nl/datasets/Gedeeld/actoren/services/actoren/sparql',
        },
        {
          sparql:
            'https://api.test.data.razu.nl/datasets/Gedeeld/locaties/services/locaties/sparql',
        },
      ],
    },
  },
  search: {
    resultsPerPagePerEndpoint: 10,
  },
  predicates: {
    parents: [
      'https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn',
      'https://schema.org/isPartOf',
      'https://schema.org/hadPrimarySource',
      'http://www.nationaalarchief.nl/mdto#isOnderdeelVan',
    ],
    label: [
      'http://www.w3.org/2000/01/rdf-schema#label',
      'https://schema.org/name',
      'https://www.ica.org/standards/RiC/ontology#title',
      'https://www.ica.org/standards/RiC/ontology#textualValue',
      'http://www.nationaalarchief.nl/mdto#naam',
      'http://www.nationaalarchief.nl/mdto#begripLabel',
      'http://www.nationaalarchief.nl/mdto#verwijzingNaam',
    ],
    type: typePredicates,
    images: imagePredicates,
  },
  renderComponents: {
    [RenderMode.ByType]: {
      'https://schema.org/Photograph': { componentId: 'sdo-photograph' },
    },
    [RenderMode.ByPredicate]: {
      'http://xmlns.com/foaf/0.1/depiction': {
        componentId: 'node-images',
      },
      'https://schema.org/contentLocation': {
        componentId: 'map-thumb',
      },
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
        componentId: 'node-type',
      },
      'https://www.ica.org/standards/RiC/ontology#hasRecordSetType': {
        componentId: 'node-type',
      },
      'https://schema.org/additionalType': {
        componentId: 'node-type',
      },
      'http://www.wikidata.org/entity/P31': {
        componentId: 'node-type',
      },
      'http://www.nationaalarchief.nl/mdto#betrokkene': {
        componentId: 'hop-link',
        hopPreds: ['http://www.nationaalarchief.nl/mdto#Actor'],
      },
      'http://www.nationaalarchief.nl/mdto#gerelateerdInformatieobject': {
        componentId: 'hop-link',
        hopPreds: [
          'http://www.nationaalarchief.nl/mdto#gerelateerdInformatieobjectVerwijzing',
        ],
      },
      'http://www.nationaalarchief.nl/mdto#dekkingInTijd': {
        componentId: 'mdto-dekking-in-tijd',
      },
    },
  },
  viewModes: {
    [ViewMode.List]: {
      [ViewModeSetting.ShowDetails]: true,
      [ViewModeSetting.ShowParents]: true,
      [ViewModeSetting.ShowTypes]: false,
      [ViewModeSetting.ShowTitle]: true,
    },
    [ViewMode.Grid]: {
      [ViewModeSetting.ShowTitle]: true,
      [ViewModeSetting.ShowDetails]: true,
    },
  },
  predicateVisibility: {
    [ViewMode.List]: {
      [PredicateVisibility.Show]: [
        ...imagePredicates,
        'https://schema.org/author',
        'http://www.nationaalarchief.nl/mdto#omschrijving',
        'http://www.nationaalarchief.nl/mdto#dekkingInRuimte',
        'http://www.nationaalarchief.nl/mdto#dekkingInTijd',
      ],
      [PredicateVisibility.Details]: [
        'http://www.nationaalarchief.nl/mdto#naam',
        '*',
      ],
      [PredicateVisibility.Hide]: [],
    },
    [ViewMode.Grid]: {
      [PredicateVisibility.Show]: [...imagePredicates],
      [PredicateVisibility.Details]: ['*'],
      [PredicateVisibility.Hide]: [],
    },
  },
  alwaysHidePredicates: [
    '@id',
    'http://www.nationaalarchief.nl/mdto#checksum',
    'http://www.nationaalarchief.nl/mdto#waardering',
  ],
  namespacePrefixes: {
    'https://www.ica.org/standards/RiC/ontology#': 'rico:',
    'https://hetutrechtsarchief.nl/def/': 'def:',
    'https://schema.org/': 'sdo:',
    'http://www.w3.org/2004/02/skos/core#': 'skos:',
    'https://hetutrechtsarchief.nl/id/': 'id:',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#': 'rdf:',
    'http://www.w3.org/2000/01/rdf-schema#': 'rdfs:',
    'http://www.wikidata.org/entity/': 'wd:',
    'http://www.wikidata.org/prop/direct/': 'wdt:',
    'http://www.w3.org/ns/prov#': 'prov:',
    'https://data.cbg.nl/pico#': 'pico:',
    'https://w3id.org/pnv#': 'pnv:',
    'http://xmlns.com/foaf/0.1/': 'foaf:',
    'http://www.nationaalarchief.nl/mdto#': 'mdto:',
    'https://test.data.razu.nl/Kasteel-Amerongen/PoC/': 'PoC:',
    'https://test.data.razu.nl/razu/': 'razu:',
    'https://www.ica.org/standards/RiC/vocabularies/recordSetTypes#':
      'ric-rst:',
    'https://data.cbg.nl/pico-terms#': 'picot:',
    'http://www.nationaalarchief.nl/mdto-shacl#': 'mdto-sh:',
    'http://www.w3.org/ns/shacl#': 'sh:',
  },
};
