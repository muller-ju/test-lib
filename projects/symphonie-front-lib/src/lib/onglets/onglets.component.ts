import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router }                                                                                                 from '@angular/router';
import {
  LibConfig,
  LibConfigService,
}                                                                                            from '../config/lib-config';
import { Onglet }                                                                            from './onglet';
import { OngletsService }                                                                    from './onglets.service';
import { ConfigurationSymphonieService }                                                     from '../config/configuration-symphonie/configuration-symphonie.service';

@Component({
  selector: 'symphonie-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss'],
})
export class OngletsComponent implements AfterContentChecked, OnInit {

  @ViewChild('ongletsDiv', { static: true }) elRef: ElementRef;

  scrollLeftPixel = 0;
  onglets: Onglet[] = [];
  interval;
  timeout;

  constructor(
    public ongletService: OngletsService,
    public router: Router,
    readonly configurationSymphonie: ConfigurationSymphonieService,
    public cd: ChangeDetectorRef,
    @Inject(LibConfigService) private config: LibConfig,
  ) {
  }

  ngOnInit() {
    this.ongletService.onglets.subscribe(
      (onglets) => {
        this.onglets = onglets;
        this.cd.detectChanges();
        this.scrollLeftPixel = this.elRef.nativeElement.scrollWidth - this.elRef.nativeElement.clientWidth;
        this.elRef.nativeElement.scrollLeft = this.scrollLeftPixel;
      },
    )
  }

  ngAfterContentChecked(): void {
    this.ongletService.onglets.subscribe(
      (onglets) => {
        const onglet = onglets.find((onglet) => onglet.path === this.router.url);
        if (onglet) {
          this.ongletService._markAsSelected(onglet);
        }
      },
    )
  }


  onClickOnglet(onglet) {
    this.ongletService._markAsSelected(onglet);
    if (onglet.origin === this.config.application) {
      this.router.navigateByUrl('/').then(()=>
      this.router.navigate([onglet.path]));
    } else {
      window.location.assign(this.configurationSymphonie.getBaseUrl() + '/' + onglet.origin + '/' + onglet.path);
    }
  }

  closeOnglet(onglet : Onglet) {
    this.ongletService._closeOnglet(onglet.id);
  }

  closeAllOnglets() {
    let originFirstOnglet = this.onglets[0].origin;
    this.ongletService.removeClosableOnglets();
    if (originFirstOnglet === this.config.application) {
      this.router.navigateByUrl('/');
    } else {
      window.location.assign(this.configurationSymphonie.getBaseUrl() + '/tempo');
    }
  }

  scrollLeft(nbPixel: number) {
    this.scrollLeftPixel += nbPixel;
    this.elRef.nativeElement.scrollLeft = this.scrollLeftPixel;
    this.timeout = setTimeout(() => this.interval = setInterval(() => {

      if ((nbPixel > 0 && this.cannotScrollRight()) || (nbPixel < 0 && this.cannotScrollLeft())) {
        this.stopScrolling();
      } else {
        this.scrollLeftPixel += nbPixel;
        this.elRef.nativeElement.scrollLeft = this.scrollLeftPixel;
      }
    }, 75), 300);
  }


  stopScrolling() {
    clearInterval(this.interval);
    clearInterval(this.timeout);
  }

  cannotScrollLeft() {
    return this.scrollLeftPixel <= 0;
  }

  cannotScrollRight() {
    return this.elRef.nativeElement.scrollWidth - this.elRef.nativeElement.clientWidth <= this.scrollLeftPixel;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cd.detectChanges();
  }

  needScrolling() {
    if (this.elRef.nativeElement.clientWidth === 0) {
      return false;
    }
    return this.elRef.nativeElement.scrollWidth - this.elRef.nativeElement.clientWidth > 0;
  }
}
