import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { RouterModule, Router } from '@angular/router';
import { MetamaskComponent } from '../metamask/metamask.component';

declare var window: any;

@Injectable()
export class Web3ConnectorService {

  web3: any;
  account: any;
  accounts: any;



  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (!window.web3) {
      console.log('no Web3 detected')
      this.router.navigate(['/metamask'])
    }
    else {
      this.web3 = new Web3(window.web3.currentProvider);
      console.log(this.web3);
      return this.web3
    };
  }

  constructor(
    private router: Router
  ) {
    this.web3 = this.checkAndInstantiateWeb3();
  }

}