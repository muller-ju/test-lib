import { CommonModule }                                   from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }               from '@angular/forms';
import { RouterModule }                                   from '@angular/router';
import { FaIconLibrary, FontAwesomeModule }               from '@fortawesome/angular-fontawesome';

import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons/faArrowAltCircleRight';
import { faFileAlt }             from '@fortawesome/free-regular-svg-icons/faFileAlt';
import { faUserCircle }          from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faBuilding }            from '@fortawesome/free-regular-svg-icons/faBuilding';
import { faHospital }            from '@fortawesome/free-regular-svg-icons/faHospital';
import { faFile }                from '@fortawesome/free-regular-svg-icons/faFile';

import { faUser }       from '@fortawesome/free-solid-svg-icons/faUser';
import { faAngleLeft }  from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faBars }       from '@fortawesome/free-solid-svg-icons/faBars';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faSearch }     from '@fortawesome/free-solid-svg-icons/faSearch';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faTimes }      from '@fortawesome/free-solid-svg-icons/faTimes';
import { faHome }       from '@fortawesome/free-solid-svg-icons/faHome';
import { faCog }        from '@fortawesome/free-solid-svg-icons/faCog';

import { ConfigurationJson }             from './config/configuration-json/configuration.service';
import { ConfigurationSymphonieService } from './config/configuration-symphonie/configuration-symphonie.service';
import { LibConfig, LibConfigService }   from './config/lib-config';
import { ChoixPositionComponent }        from './header/choix-position/choix-position.component';
import { HeaderComponent }               from './header/header.component';
import { RibbonComponent }               from './header/ribbon/ribbon.component';
import { OngletsComponent }              from './onglets/onglets.component';
import { ToastrModule }                  from 'ngx-toastr';
import { DisableLinkDirective }          from './header/disable-link.directive';
import { PaginationComponent }           from './pagination/pagination.component';
import { PaginationControllerComponent } from './pagination/pagination-controller.component';
import {
  BarreRechercheComponent,
  EnumCriteriaDirective,
  ListCriteriaDirective,
  SearchCriteriaDirective,
  SelectCriteriaDirective
}                                        from './barre-recherche/barre-recherche.component';

import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield';

export function getUseFactory(configuration: ConfigurationJson, libconfig: LibConfig) {

  return () => configuration.initialiseConfiguration(libconfig.cfgUrl());

}

export function getConfigurationSymphonieFactory(configuration: ConfigurationSymphonieService, libconfig: LibConfig) {
  return () => configuration.initialiseConfiguration(libconfig);
}

//@dynamic
@NgModule({
  declarations: [
    OngletsComponent,
    HeaderComponent,
    ChoixPositionComponent,
    RibbonComponent,
    DisableLinkDirective,
    PaginationComponent,
    PaginationControllerComponent,
    BarreRechercheComponent, SearchCriteriaDirective, EnumCriteriaDirective, SelectCriteriaDirective, ListCriteriaDirective
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 0,
      closeButton: true,
      tapToDismiss: false,
      extendedTimeOut: 0,
    }),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    RibbonComponent,
    OngletsComponent,
    HeaderComponent,
    ChoixPositionComponent,
    DisableLinkDirective,
    // FontAwesomeModule,
    ToastrModule,
    PaginationComponent,
    PaginationControllerComponent,
    BarreRechercheComponent, SearchCriteriaDirective, EnumCriteriaDirective, SelectCriteriaDirective, ListCriteriaDirective
  ],
})
export class SymphonieFrontLibModule {
  constructor(public library: FaIconLibrary) {
    library.addIcons(faUserCircle, faUser, faBars, faInfoCircle, faSignOutAlt, faArrowAltCircleRight, faFileAlt, faSearch,
      faAngleRight, faAngleLeft, faTimes, faHome, faBuilding, faHospital, faFile, faCog, faUserShield);
  }

  public static forRoot(config?: LibConfig): ModuleWithProviders<SymphonieFrontLibModule> {
    return {
      ngModule: SymphonieFrontLibModule,
      providers: [
        {provide: LibConfigService, useValue: config},
        {
          provide: APP_INITIALIZER,
          useFactory: getUseFactory,
          deps: [ConfigurationJson, LibConfigService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: getConfigurationSymphonieFactory,
          deps: [ConfigurationSymphonieService, LibConfigService],
          multi: true,
        },
      ],
    };
  }
}

