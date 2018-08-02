import { Component, OnInit } from '@angular/core';
import { ContractFunctionsService } from '../services/contract-functions.service';

@Component({
  selector: 'app-donate',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectData = {
    projectName: "",
    projectDescription: "",
    runtime: "",
    minFunding: "",
    maxFunding: "",
  }

   createProject() {
    this.contractFunctionsService.createProject(this.projectData).then(console.log)
  }

  constructor(
    private contractFunctionsService: ContractFunctionsService
  ) { }

  ngOnInit() {
    console.log(this.contractFunctionsService.web3)
  }

}
