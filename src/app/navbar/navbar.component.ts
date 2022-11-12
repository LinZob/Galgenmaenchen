import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent {

  public vUser = new PlayerService();           /* Service steht für die Spielerdatenbank */

  public vName: string = "";                    /* Eigenschaften der Klasse Player */
  public vPwd: string = "";
  public vStatus: number = -1;
  public vAnswer: string ="";                   /* Kommunikation mit User */

  public vAdminStat: number[] = [-1,0];         
  
  public readonly items: string[] = this.vUser.getUserList();     /* Im Entwicklungsmodus werden die Spielernamen im Browser gelistet*/

/* Abgleich der Eingaben mit Player Daten */
  public vergleich() : void{
      this.vAdminStat = this.vUser.logIn(this.vName,this.vPwd);
      if (this.vAdminStat[0] == -1){
          this.vAnswer = "Bitte erneut versuchen";
      }
      else if (this.vAdminStat[0] == 1){
          this.vAnswer = "Willkommen"+this.vName;
          this.vStatus = this.vAdminStat[1];
      }
      else if (this.vAdminStat[0] == 0){
          this.vAnswer = "Administrator" +this.vName;
          this.vStatus = this.vAdminStat[1];
      }
      else {
          this.vAnswer = "Unbekannter Fehler";
      }

  
    }
/* Platzhalter für die Aufnahme eines neuen Wortes eine Datenbank */
    public nextWord() : void{
        this.vAnswer = "Im Entwicklungsmodus ist kein neuer Eintrag im Wortschatz möglich.";
    }
/* Platzhalter für die Anmeldung eines neuen Spielers */
    public dummy() : void{
        this.vAnswer = "Kein neuer Spieler im Entwicklungsmodus möglich.";
    }
/* Zurücksetzen der Eigenschaften beim Abmelden */
    public clear() : void{
        this.vName = "";
        this.vAnswer = "";
        this.vStatus = -1;
        this.vPwd = "";
    }


}

