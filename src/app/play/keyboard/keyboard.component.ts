import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnChanges {


  @Output() readonly dummy = new EventEmitter();      /* für die Aktualisierung in aufrufender Komponente */
  @Input() vNext: string = "";                        /* von aufrufender Komponente */

  public readonly items: string[] = [                 /* Bezeichner für alle runden Buttons */
    'A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  
  public vTipp: string = '';  


  public clickButton(): void {                  /* nur während der Entwicklung */    
    this.dummy.emit("next");
  }

  public addLetter(val : number): void {        /* bei jedem Buchstabentipp vom Spieler wird die aufrufende Komponente aktualisiert */
      this.vTipp += this.items[val];
      this.dummy.emit(this.vTipp);
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {   /* löscht die Buchstabentipps des Spielers bei einem neuen Wort */
    this.vTipp = "";
  }

}
