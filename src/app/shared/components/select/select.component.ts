import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {

  @Input() title:string = '';
  @Input() data:any ;

  @Output() selectedCategoy = new EventEmitter();
  constructor(){}

  ngOnInit(): void {

  }

  detectChanges(event:any){
    this.selectedCategoy.emit(event);
  }


}
