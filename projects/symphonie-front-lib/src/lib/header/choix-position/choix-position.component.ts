import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthentificationService }                        from '../../authentification/authentification.service';


@Component({
  selector: 'symphonie-choix-position',
  templateUrl: './choix-position.component.html',
  styleUrls: ['./choix-position.component.scss']
})
export class ChoixPositionComponent implements OnInit {

  @Input() isOpened;
  @Input() version;
  @Input() currentUser;

  @Output() isOpenedChange: EventEmitter<any> = new EventEmitter();

  constructor( private authenticationService : AuthentificationService ) { }

  ngOnInit() {
  }

  close(event: Event) {
    this.isOpenedChange.emit(false);
    event.preventDefault();
  }


  changePosition($event) {
    const currentPosition = this.currentUser.positions.find(p => p.idPosition === $event.target.value);
    this.authenticationService.changeCurrentPosition( currentPosition );
  }

}
