import { Injectable } from '@angular/core';
import { Web3ConnectorService } from './web3-connector.service';

import * as contract from "truffle-contract";

declare var System: any;  



@Injectable()
export class ContractFunctionsService {
web3:any;
contractInstance:any;
contracts: any[] = [];
auctionContract;

createProject(projectData){
  return this.contractInstance.at("0x1215B371A4c273E2fD786116947Ad9870fb94BC3").then(inst => {
    return inst.createProject( projectData.projectName, projectData.projectDescription, projectData.runtime, projectData.minFunding, projectData.maxFunding, {from: this.web3.eth.accounts[0], gas: 2000000})
  });
}


 getContracts(){
  return this.setContract().then( () => {
  return this.contractInstance.at("0x1215B371A4c273E2fD786116947Ad9870fb94BC3").then(inst => {
    return inst.getContracts({from: this.web3.eth.accounts[0], gas: 2000000})
  });
})
} 

fund(ID, value){
  return this.contractInstance.at("0x1215B371A4c273E2fD786116947Ad9870fb94BC3").then(inst => {
    return inst.fund(ID, {from: this.web3.eth.accounts[0], value: value, gas: 2000000})
  });
} 

getContractData(ID){
  return this.setContract().then( () => {
  return this.contractInstance.at("0x1215B371A4c273E2fD786116947Ad9870fb94BC3").then(inst => {
    return inst.getDataOfContract(ID , {from: this.web3.eth.accounts[0], gas: 2000000})
  });
})
} 

bids(bidValue: number, sender: any, contract: any){
  console.log(contract);
  return this.contractInstance.at(contract).then(inst => {
    return inst.bid({from: sender, value: bidValue})
  });
}

getHighestBidder(contract: any) {
  return this.contractInstance.at(contract).then(inst => {
    return inst.highestBidder.call();
  })
}

getHighestBid(contract: any) {
  return this.contractInstance.at(contract).then(inst => {
    return inst.highestBid.call();
  })
}

make(){
  var newContract;
  return newContract = this.contractInstance.new(20000, this.web3.eth.coinbase, {from: this.web3.eth.coinbase, gas: 999999})
    .then(res => {
      this.contracts.push(res.address);
      return this.contracts;
    })
}

setContract() {
  return new Promise ((resolve, reject) => {
  return System.import('../../../truffle/build/contracts/projectAdmin.json').then(file => {
    this.auctionContract = file;
    this.contractInstance = contract(this.auctionContract);
    this.contractInstance.setProvider(this.web3.currentProvider);
    resolve("contract loaded")
  })
})
    }


  constructor(public web3ConnectorService: Web3ConnectorService,) { 
  this.web3 = this.web3ConnectorService.web3;
  console.log(this.web3.eth.accounts)
  this.setContract().then(console.log);
}

}