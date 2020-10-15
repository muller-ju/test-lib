import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList, ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Directive({
  selector: 'symphonie-select-criteria'
})
export class SelectCriteriaDirective {
  @Input() elements: Array<any>;
  @Input() keyFieldName: string;
  @Input() valueFieldName: string;

  listElements() {
    if( ! this.keyFieldName ){
      console.error('in select criteria keyFieldName is required' , this);
    }
    if( ! this.valueFieldName ){
      console.error('in select criteria valueFieldName is required' , this);
    }
    return this.elements
      .map((element)=>{
        return {key:element[this.keyFieldName],value:element[this.valueFieldName]};
      });
  }
}

@Directive({
  selector: 'symphonie-enum-criteria'
})
export class EnumCriteriaDirective {
  @Input() enum: any;

  listElements() {
    return Object
      .keys(this.enum)
      .map((key)=>{
      return {key:key,value:this.enum[key]};
    });
  }
}
@Directive({
  selector: 'symphonie-list-criteria'
})
export class ListCriteriaDirective {
  @Input() list: string[];
  @Input() values: string;

  private getElements(){
    if (this.values){
      return this.values.split(';')
    }else{
      return this.list;
    }
  }

  listElements() {
    return this.getElements().map((value) => {
      return {key: value, value: value};
    });
  }
}

@Directive({
  selector: 'symphonie-criteria-field'
})
export class SearchCriteriaDirective implements AfterContentInit{
  @Input() type?: string;

  @Input() id?: string;
  @Input() libelle?: string;

  @Input() divClass?: string = '';
  @Input() objectClass?: string = 'input is-size-7';

  @ContentChild(SelectCriteriaDirective) selectCriteria: SelectCriteriaDirective;
  @ContentChild(EnumCriteriaDirective) enumCriteria: EnumCriteriaDirective;
  @ContentChild(ListCriteriaDirective) listCriteria: ListCriteriaDirective;


  ngAfterContentInit(){
    if( this.type == 'select' && ! this.selectCriteria ){
      console.error('select criteria should have SelectCriteriaDirective' , this);
    }
    if( this.type == 'enum' && ! this.enumCriteria ){
      console.error('enum criteria should have EnumCriteriaDirective' , this);
    }
  }

  isList() : boolean {
    return this.type == 'enum' || this.type == 'select' ||this.type == 'list';
  }

  getListElements() {
    if (this.type == 'select'){
      return this.selectCriteria?.listElements();
    }else if(this.type == 'enum'){
      return this.enumCriteria?.listElements();
    }else{
      return this.listCriteria?.listElements();
    }
  }
}

@Component({
  selector: 'symphonie-barre-recherche',
  templateUrl: './barre-recherche.component.html',
  styleUrls:['./barre-recherche.component.scss'],
})
export class BarreRechercheComponent implements OnInit,AfterContentInit {
  valueParamsList = {};
  @Output() lancerRechercheEmitter = new EventEmitter();
  @Output() resetRechercheEmitter = new EventEmitter();

  @ContentChildren(SearchCriteriaDirective) criterias! : QueryList<SearchCriteriaDirective>;
  @ViewChildren('datePicker') datePickers! : QueryList<ElementRef>;

  barreRechercheForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.barreRechercheForm = this.formBuilder.group({});
  }

  ngAfterContentInit(){
    this.criterias.forEach((criteria)=>{
      this.barreRechercheForm.addControl(criteria.id, this.formBuilder.control(''));
    });
    this.barreRechercheForm.reset();
  }

  objectChange(objectId) {
    this.valueParamsList[objectId] = this.barreRechercheForm.get(objectId).value;
  }

  lancerRecherche() {
    this.lancerRechercheEmitter.emit(this.valueParamsList);
  }

  resetRecherche() {
    this.barreRechercheForm.reset();
    this.resetDatePickers();
    this.valueParamsList = {};
    this.resetRechercheEmitter.emit();
  }

  resetDatePickers(){
    this.datePickers.forEach(
      datePicker => {
        let element = datePicker.nativeElement;
        if( element.placeholder && element.placeholder != '' ){
          element.type = 'text';
        }
      }
    );
  }
}
