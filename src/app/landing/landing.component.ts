import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  eingabeName: string; 

  constructor() { }

  ngOnInit() {}


  processForm(){
    //this.eingabeName = "oh";
    const allInfo = `hallo ${this.eingabeName}`;
    alert(allInfo);
  }

}
