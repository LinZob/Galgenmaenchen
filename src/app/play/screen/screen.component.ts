import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnChanges {


  @Input() vWort: string ="";                 /* von aufrufender Komponente */
  @Input() vCount: number = 0;

  public valSrc: string = "nix";              /* Zusammensetzung des Pfades zu den jeweiligen Bildern */



  constructor() { }
/* bei Änderugen in der aufrufenden Komonente werden die Bilder angepasst */
  ngOnChanges(changes: SimpleChanges): void {
    if(this.vCount < 13){
      if(this.vWort.includes('_')){
        this.valSrc = "../../../assets/hang" + this.vCount  +".png";
      }
      else{
        this.valSrc = "../../../assets/no_hang.png"
      }
      
    }
    else{
      this.valSrc = "../../../assets/hang13.png"
    }
  }



  ngOnInit(): void {

    this.valSrc = "../../../assets/hang" + this.vCount  +".png";
  }





}
