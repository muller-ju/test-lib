import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import {
  LibConfig,
  LibConfigService,
}                                                          from '../config/lib-config';

@Directive({
  selector: '[disableLink]',
})
export class DisableLinkDirective {

  @Input() target: string;


  constructor(private _el: ElementRef, private _renderer: Renderer2, @Inject(LibConfigService) private config: LibConfig) {
  }

  ngAfterViewInit() {
    const hostElem = this._el.nativeElement;
    if(this.config.env() === 'dev' && this.target !== this.config.application) {
      this._renderer.addClass(this._el.nativeElement,'isDisabled');
      if((hostElem.children[0] && hostElem.children[0].tagName === 'A')) {
        this._renderer.setAttribute(hostElem.children[0],'aria-disabled', 'true');
      }
      if((hostElem.children[1] && hostElem.children[1].tagName === 'A')) {
        this._renderer.setAttribute(hostElem.children[1],'aria-disabled', 'true');
      }
      if(hostElem.children[0] && hostElem.children[0].tagName === 'INPUT') {
        this._renderer.setAttribute(hostElem.children[0],'disabled', 'true');
      }
    }

  }


}
