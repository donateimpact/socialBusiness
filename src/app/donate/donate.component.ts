import { Component, OnInit } from '@angular/core';
import { ContractFunctionsService } from '../services/contract-functions.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  contracts = []
  fundingAmount = []
  warning = []
  disable = []

  constructor(
    private contractFunctionsService: ContractFunctionsService
  ) {
    this.updateContracts()
  }

  onKey(event: any, ID) { // without type info
    this.fundingAmount[ID] = event.target.value;
    console.log(this.fundingAmount[ID])
  }

  fund(ID) {
    console.log(this.fundingAmount[ID])
    this.warning[ID] = "Please Wait for Mining";
    this.disable[ID] =true;
    this.contractFunctionsService.fund(ID, this.fundingAmount[ID]).then( () => {
      this.warning[ID] = "Successfully Mined!";
      this.updateContracts()
    })
  }


 updateContracts(){

  this.contracts = [];
  this.disable = [];

  this.contractFunctionsService.getContracts().then(res => {

    for (let i = 0; i < res[0].length; i++) {
      this.contractFunctionsService.getContractData(i).then( (contractData) => {

        this.fundingAmount.push("")
        this.disable.push(false)
        this.warning.push("Donate Now")

        let tempContract = {
          projectOwner: "",
          projectId: null,
          projectAddress: "",
          projectName: "",
          projectDescription: "",
          runtime: "",
          minFunding: "",
          maxFunding: "",
          status: "",
          currentFund: "",
        }

        tempContract.projectId = i
        tempContract.projectAddress = res[1][i]
        tempContract.projectOwner = contractData[0]
        tempContract.projectName = contractData[1]
        tempContract.runtime = contractData[2]
        tempContract.projectDescription= contractData[3]
        tempContract.runtime = contractData[4]
        tempContract.minFunding = contractData[5]
        tempContract.maxFunding = contractData[6]
        tempContract.currentFund = contractData[8]

        this.contracts.push(tempContract)
  })
    }
    console.log(this.contracts)
  })
 }

  ngOnInit() {

  }

}
