import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

/* ausgehend von aktuellen Millisekunden werden Zufallszahlen generiert */
  public vZahl : number = 0;

  constructor() { }

  public getNum(){
    
    let dateTime = new Date();
    let val = dateTime.getMilliseconds();

    return val;

  }

  public getNumInt(a : number, b: number){

    let dateTime = new Date();
    let val = dateTime.getMilliseconds();
    let diff = 0;

    if (a>b){
      diff = a-b;
    }
    else{
      diff = b-a;
    }

    while(val > diff){
      val = val - diff;
    }

    return val;


  }
}



