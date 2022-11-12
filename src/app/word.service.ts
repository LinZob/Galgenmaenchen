import { Injectable } from '@angular/core';
import { Word } from './word';
import { StatusService } from './status.service';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})

/* Ersatz für eine Datenbank der gefragten Worte
  vTry und vSolve sind als Schwierigkeitsgrad eines Wortes vorgesehen aber noch nicht benutzt */
export class WordService {

  public wortschatz : Word[] = [
    {
      vWord : "Hammer",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Truhe",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Schlange",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Knochen",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Puppe",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Schmutz",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Schifffahrt",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Alkoholkontrolle",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Schmetterling",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Sumpf",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Hummel",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Storch",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Truhe",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Pfifferling",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Steckdose",
      vTry : 0,
      vSolve : 0,
    },
    {
      vWord : "Klavier",
      vTry : 0,
      vSolve : 0,
    }
  ]

  /* liefert eine Liste aller Worte als Array */
  public getWorte(){

    let max : number = this.wortschatz.length;
    let i : number;
    let texte : string[] =[];

    for (i = 0; i < max; i++) {
      texte[i]=this.wortschatz[i].vWord;

    }
  
    return texte;

  }


  constructor() { }

  /* liefert anhand einer Statusnummer ein Wort das der Spieler noch nicht gespielt hat zurück und eine neue Statusnummer */

  public getTipp(stat: number){

    let vTipp:number = -1;
    let arrStatus: boolean [] = [];
    let ret: number[] = [0,0];
    let vRandom: number = new RandomService().getNumInt(0,this.wortschatz.length);
    let i: number = 0;
    let sStatus = new StatusService();

    arrStatus = sStatus.toArray(stat,this.wortschatz.length);

    for(i=vRandom; i<this.wortschatz.length;i++){
      if(arrStatus[i]==false){
        vTipp = i;
        arrStatus[i] = true;
        i = this.wortschatz.length;
      }
    }
    
    if(vTipp == -1){
      for(i=vRandom; i>0;i--){
        if(arrStatus[i]==false){
          vTipp = i;
          arrStatus[i] = true;
          i = 0;
        }
      }
  
    }

    ret[0] = vTipp;
    ret[1] = sStatus.toNumber(arrStatus);

    return ret;
  }

  public getWordAt(index: number){
    return this.wortschatz[index].vWord;
  }
}
