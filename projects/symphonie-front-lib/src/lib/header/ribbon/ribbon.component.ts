import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConfigurationSymphonieService }                                  from '../../config/configuration-symphonie/configuration-symphonie.service';

@Component({
  selector: 'symphonie-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss'],
})
export class RibbonComponent implements OnInit, AfterViewInit {

  @ViewChild('ribbon', { static: false }) elementView: ElementRef;

  env;
  style;
  isProdOuPreprod = false;


  constructor(public el: ElementRef, public configurationSymphonie : ConfigurationSymphonieService ) {
    this.env = this.configurationSymphonie.getKey('env').valeur;
    this.isProdOuPreprod =
      this.env  === 'production' ||
      this.env  === 'preproduction';
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    this.style = this.calculateStyle();
  }

  calculateStyle() {
    const width = 130;
    const angle = 45;
    const sin = Math.sin(Math.PI / 180 * angle);
    const cos = Math.cos(Math.PI / 180 * angle);
    const height = this.elementView.nativeElement.clientHeight;
    const top = Math.floor(width / 2 * sin - cos * height);
    const right = Math.floor(-(width / 2 - width / 2 * cos) - sin * height / 2);
    return {
      width: width + "px",
      transform: `rotate(${angle}deg)`,
      top: top + "px",
      right: right + "px",
    }
  }

}
