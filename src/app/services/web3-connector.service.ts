import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare var window: any;

@Injectable()
export class Web3ConnectorService {

  web3: any;
  account: any;
  accounts: any;
  


  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545')
      );
    }
    console.log(this.web3);
    return this.web3
    };

  constructor() {
    this.web3 = this.checkAndInstantiateWeb3();
   }

}