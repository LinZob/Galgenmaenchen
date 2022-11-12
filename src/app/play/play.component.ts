import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../word.service';
import { StatusService } from '../status.service';
import { RandomService } from '../random.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {

  public vWort: string = "";       
  public vSendToScreen: string = "";            /* nach Screen */
  public vImport: string = "";                  /* von Keyboard */
  public vCount: number = 0;                    /* nach Screen */
  public vStatus: number = 0;                   /* von Navigation */
  public arrStatus: boolean[] = [];             /* Wahrheitswerte je nach Spieler */
  public arrWords: string[] = [];               /* Lister aller vorhandenen Worte */
  public vZahl: number = 0;                     /* nur für die Entwicklung*/

  public sStatus = new StatusService();         /* Umwandlung von Integer in Wahrheitswertarray und umgekehrt */
  public sWord = new WordService();             /* Datenbank für alle verwendeten Worte vielleicht mal Statistik */

  constructor(private readonly activatedRoute: ActivatedRoute) { }   /* über Routing  */

  ngOnInit(): void {                             /* Navigation gibt einen Wert weiter, der im Browser erscheint */
    const params = this.activatedRoute.snapshot.params;
    this.vStatus = params['id'];

  }
/* Antwort von der Sub Komponente keyboard  'val: string' 
   das zu suchende Wort 'vWort' wird umgewandelt in Buchstaben und Unterstriche
   an die Sub Komponente weitergeleitet als 'vSendToScreen'*/

  public import(val : any) : void {
    this.vImport = val;
    let i: number = 0;
    let j: number = 0;
    let discount: number = 0;
    let wort: string = this.myUpper(this.vWort);
    let letter: string = "";
    let arrCount: number[] = [];                  
    this.vSendToScreen = '';
    this.vCount = this.vImport.length;

    for(j=0;j<this.vImport.length;j++){
      arrCount[j] = 0;
    }

    for(i=0;i<this.vWort.length;i++){
      letter = "_";
      for(j=0;j<this.vImport.length;j++){
        if(wort.charAt(i)==this.vImport.charAt(j)){
          letter = this.vImport.charAt(j);
          arrCount[j] = 1;        
        }
      }
      this.vSendToScreen = this.vSendToScreen + letter;
    }

    for(j=0;j<this.vImport.length;j++){         /* die Anzahl der richtigen angefragten Buchstaben wird von der Gesamtzahl der Anfragen abgezogen */
      this.vCount = this.vCount - arrCount[j];
    }

    if(this.vCount >= 13){            /* nach 13 falschen Antworten ist Schluss */
      this.vSendToScreen = this.vWort;
    }


  }

/* in 'vWort' wird ein Wort aus der Datenbank gespeichert, das der aktuelle Spieler noch nicht gespielt hat 
  und dann in den Statuseigensschaften als gespielt eingetragen */
  public clickButton(): void {

    this.arrWords = this.sWord.getWorte();
    this.arrStatus = this.sStatus.toArray(this.vStatus,this.arrWords.length);
    this.vSendToScreen = '';
    this.vImport = "";
    this.vCount = 0;
    let tip: number[] = [0,0];
    let j: number = 0;

    tip = this.sWord.getTipp(this.vStatus);
    if(tip[0] < 0){       /* falls alle Worte schon gespielt wurden erfolgt Zurücksetzung */
      tip[0] = 1;
      tip[1] = 1;
    }
    this.vWort = this.sWord.getWordAt(tip[0]);
    this.vStatus = tip[1];

    for(j=0;j<this.vWort.length;j++){
      this.vSendToScreen += '_'; 
    }


  }

/* Umwandlung von Klein- in Großbuchstaben des kompletten Wortes*/  
  public myUpper(word: string) {

    let ret: string = word;
    let i : number = 0;

    let lower: string[] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let upper: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for(i=0;i<26;i++){
      while(ret.includes(lower[i])){
        ret = ret.replace(lower[i],upper[i]);
      }
    }


    return ret;

  }


}
