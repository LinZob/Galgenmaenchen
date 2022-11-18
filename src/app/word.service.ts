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
      vTry : 374,
      vSolve : 284,
    },
    {
      vWord : "Truhe",
      vTry : 587,
      vSolve : 489,
    },
    {
      vWord : "Schlange",
      vTry : 465,
      vSolve : 395,
    },
    {
      vWord : "Knochen",
      vTry : 482,
      vSolve : 369,
    },
    {
      vWord : "Puppe",
      vTry : 578,
      vSolve : 125,
    },
    {
      vWord : "Schmutz",
      vTry : 368,
      vSolve : 251,
    },
    {
      vWord : "Schifffahrt",
      vTry : 415,
      vSolve : 365,
    },
    {
      vWord : "Alkoholkontrolle",
      vTry : 325,
      vSolve : 187,
    },
    {
      vWord : "Schmetterling",
      vTry : 248,
      vSolve : 82,
    },
    {
      vWord : "Sumpf",
      vTry : 514,
      vSolve : 482,
    },
    {
      vWord : "Hummel",
      vTry : 315,
      vSolve : 83,
    },
    {
      vWord : "Storch",
      vTry : 414,
      vSolve : 321,
    },
    {
      vWord : "Truhe",
      vTry : 415,
      vSolve : 135,
    },
    {
      vWord : "Pfifferling",
      vTry : 512,
      vSolve : 321,
    },
    {
      vWord : "Steckdose",
      vTry : 314,
      vSolve : 216,
    },
    {
      vWord : "Klavier",
      vTry : 185,
      vSolve : 124,
    },
    {
      vWord : "Rauch",
      vTry : 185,
      vSolve : 94,
    },
    {
      vWord : "Knolle",
      vTry : 412,
      vSolve : 389,
    },
    {
      vWord : "Schinken",
      vTry : 348,
      vSolve : 284,
    },
    {
      vWord : "Kelle",
      vTry : 485,
      vSolve : 315,
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

  /* liefert anhand einer Statusnummer eine Positionsnummer eines Wortes, das der Spieler noch nicht gespielt hat zurück und eine neue Statusnummer */

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
