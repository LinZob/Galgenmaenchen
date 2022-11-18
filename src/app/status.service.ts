import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* wandelt eine Ganzzahl eineindeutig in ein Array von Boolean Werten um und umgekehrt 
  Idee war die Umwandlung von Dezimalzahlen in Binärzahlen zur Abbildung von Wahrheitswerten
  Probleme: keine Binärzahlen und Wahrheitswerte nur 'true' und 'false' nicht '1' und '0'
  momentan beschränkt auf 16 bei toNumber*/

export class StatusService {

  public a: boolean[]=[];
  public n: number = 0;

  constructor() { }

  public toArray(num: number, max: number){
    let i : number = num;
    let j : number = 0;
    let arr : number[] = [];

    for(j=0;j<max;j++){
      this.a[j] = false;
      if(j==0){
        arr[j] = 1;
      }
      else arr[j] = arr[j-1]*2;
    }

 
    for(j=max-1; j>=0; j--) {
      if(i>=arr[j]){
        this.a[j] = true;
        i=i-arr[j];
      }
    }

    return this.a;


  }

  public toNumber(arr: boolean[]){
    
    let i,j : number = 0;
    let diff : number[] = [];

    for(i=0; i<arr.length;i++){
      diff[i]=1;

      for(j=0; j<i; j++){
        diff[j] = diff[j]*2;
      }
 
    }
    
    for(j=0; j<arr.length;j++){
      if(arr[j]==true){
        this.n = this.n + diff[j];
      }

    }
    
    return this.n;
  }
}
