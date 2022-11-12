import { Injectable } from '@angular/core';
import { Player } from './player';


@Injectable({
  providedIn: 'root'
})

/* Ersatz für eine Datenbank der Spieler und Administratoren */
export class PlayerService {

  public user : Player[] = [
    {
      vName : "Peter",
      vPwd : "Paul",
      vAdmin : false,
      vStatus : 2152,
    },
    {
      vName : "Harry",
      vPwd : "Sally",
      vAdmin : false,
      vStatus : 11,
    },
    {
      vName : "Tom",
      vPwd : "Jerry",
      vAdmin : true,
      vStatus : 6001,
    },
    {
      vName : "Dick",
      vPwd : "Doof",
      vAdmin : false,
      vStatus : 7,
    },
    {
      vName : "Tim",
      vPwd : "Struppi",
      vAdmin : true,
      vStatus : 0,
    },
    {
      vName : "Thelma",
      vPwd : "Louise",
      vAdmin : false,
      vStatus : 4,
    },
    {
      vName : "Asterix",
      vPwd : "Obelix",
      vAdmin : true,
      vStatus : 271,
    }

  ]

/* Liste aller Spieler als Array nur im Entwicklungsmodus*/
  public getUserList(){

    let max : number;
    let i : number;
    let player : string[] =[];

    max = this.user.length;

    for (i = 0; i < max; i++) {
      player[i]=this.user[i].vName

    }
  
    return player;

  }

/* Abgleich von eingegebenenen Namen und Passworten mit den Daten
   die Administratoreingenschaft und der Status des Spielers werden zurückgegeben, wenn der Spieler vorhanden ist */
  public logIn(name : string, pwd : string){
    
    let bob : number[] = [-1,-1];
    let i : number;
    let max : number = this.user.length;

    for (i = 0; i < max; i++) {
      if(name == this.user[i].vName){
        if(pwd == this.user[i].vPwd){
          bob[1] = this.user[i].vStatus;
          if(this.user[i].vAdmin){
            bob[0] = 0;
          }
          else{
            bob[0] = 1;
          }

        }
      }

    }

    return bob;
  }

 /*  
 
  public newPlayer(name : string, pwd : string){
    let newcommer = new Player();
    let i = this.user.length

    newcommer.name = name;
    newcommer.pwd = pwd;

    return i;

  }

*/
  constructor() { }



}
