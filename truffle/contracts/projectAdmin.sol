pragma solidity ^0.4.24;

contract project {
    
    address projectOwner;
    string public projectName;
    string projectDescription;
    uint runtime; //in Days
    uint minFunding; //in wei
    uint maxFunding; // in wei
    uint timeStampofCreation; 
    uint projectStatus; // 0: deactivated, 1: activated, 2: aborted
    
    mapping(address => uint) funderMapping;
    
    struct FundLog{
        address funder;
        uint fundingValue;
    }
    
    FundLog[] public fundLog;
    
    modifier isOwner {
        require (projectOwner == tx.origin);
        _;
    }
    
    modifier isDue {
        require ( now >= timeStampofCreation + runtime * 1 days );
        _;
    }
    
    modifier isActive {
        require ( projectStatus == 1 );
        _;
    }
    
    
    modifier minReached {
        require ( this.balance >= minFunding );
        _;
    }
    
    // constructor used to set Data
    constructor(
    string _projectName,
    string _projectDescription,
    uint _runtime,
    uint _minFunding,
    uint _maxFunding) {
        
    projectOwner = tx.origin;
    projectName = _projectName;
    projectDescription = _projectDescription;
    runtime = _runtime;
    minFunding = _minFunding;
    maxFunding = _maxFunding;
    timeStampofCreation = now;
    projectStatus = 1;
    
    }
    
    function changeData(
    string _projectName,
    string _projectDescription,
    uint _runtime,
    uint _minFunding,
    uint _maxFunding ) public isOwner isActive {
        
    projectName = _projectName;
    projectDescription = _projectDescription;
    runtime = _runtime;
    minFunding = _minFunding;
    maxFunding = _maxFunding;
    }
    
    function getStatus() public view returns(uint _projectStatus) {
        return (projectStatus);
    }
    
    function getName() public view returns(string _projectName) {
        return (projectName);
    }
    
    function getData() public view returns(address _projectOwner, string _projectName, uint _projectStatus, string _projectDescription, uint _runtime, uint _minFunding, uint _maxFunding, uint _timeStampofCreation, uint _currentFund) {
        uint currentFund = this.balance;
        return(projectOwner, projectName, projectStatus, projectDescription, runtime, minFunding, maxFunding, timeStampofCreation, currentFund);
    }
    
    function fund() public payable isActive {
        FundLog memory tempFundLog;
        
        tempFundLog.funder = tx.origin;
        tempFundLog.fundingValue = msg.value;
        
        fundLog.push(tempFundLog);
        
        funderMapping[tx.origin] = msg.value;
    }
    
    function getLog() public view returns(address[], uint[]){
        uint arrayLength = fundLog.length;
        address[] memory funderArray = new address[](arrayLength);
        uint[] memory valueArray = new uint[](arrayLength);
        
        for (uint i = 0; i< arrayLength; i++) {
            funderArray[i] = fundLog[i].funder;
            valueArray[i] = fundLog[i].fundingValue;
        }
        
        return(funderArray, valueArray);
    }
    
    function payOutFunding() isOwner isActive minReached public { //ne is Due
        tx.origin.transfer(this.balance);
        projectStatus = 0;
    }
    
    function retreiveFundingBack() public {
        require (funderMapping[tx.origin] > 0);
        
        if ( projectStatus != 2 ) {
            require ( now >= timeStampofCreation + runtime * 1 days ); //project is due;
            require ( this.balance <= minFunding );
            tx.origin.transfer(funderMapping[tx.origin]);
        }
        
        else {
            tx.origin.transfer(funderMapping[tx.origin]);
        }
    }
    
    
    function () isActive payable {
        FundLog memory tempFundLog;
        
        tempFundLog.funder = tx.origin;
        tempFundLog.fundingValue = msg.value;
        
        fundLog.push(tempFundLog);
        
    }
    
    function cancelProject() public {
        projectStatus = 2;
    }
    
}


contract projectAdmin {
    
    address[] contractList;
    
    function createProject(
    string _projectName,
    string _projectDescription,
    uint _runtime,
    uint _minFunding,
    uint _maxFunding) {
        address contractAddress = new project(
            _projectName,
            _projectDescription,
            _runtime,
            _minFunding,
            _maxFunding);
            
        contractList.push(contractAddress);
    }
    
    function changeData(
    uint _projectID,
    string _projectName,
    string _projectDescription,
    uint _runtime,
    uint _minFunding,
    uint _maxFunding ) public {
        project(contractList[_projectID]).changeData(
            _projectName,
            _projectDescription,
            _runtime,
            _minFunding,
            _maxFunding);
        
    }
    
    function getDataOfContract(uint _projectID) public view returns(address _projectOwner, string _projectName, uint _projectStatus, string _projectDescription, uint _runtime, uint _minFunding, uint _maxFunding, uint _timeStampofCreation, uint _currentFund) {
        return(project(contractList[_projectID]).getData());
    }
    
    function fund(uint _projectID) public payable {
        require ( project(contractList[_projectID]).getStatus() == 1 );
        project(contractList[_projectID]).fund.value(msg.value)();
    }
    
    function getLog(uint _projectID) public view returns(address[], uint[]){
        return(project(contractList[_projectID]).getLog());
    }
    
    function payOutFunding(uint _projectID) public { //ne is Due
        project(contractList[_projectID]).payOutFunding();
    }
    
    function retreiveFundingBack(uint _projectID) public {
        project(contractList[_projectID]).retreiveFundingBack();
    }
    
    function getContracts() public view returns (uint[] _ID, address[] _contractAddress, bytes32[] _contractName) {
        uint arrayLength = contractList.length;

        uint[] memory ID = new uint[](arrayLength);
        address[] memory contractAddress = new address[](arrayLength);
        bytes32[] memory contractName = new bytes32[](arrayLength);
        
        for (uint i = 0; i< arrayLength; i++) {
            ID[i] = i;
            contractAddress[i] = contractList[i];
            contractName[i] = stringToBytes32(project(contractList[i]).getName());
        }
        
        return (ID, contractAddress, contractName);
    }
    
    function cancelProject(uint _projectID) public {
        project(contractList[_projectID]).cancelProject();
    }
    
    function stringToBytes32(string memory source) private returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}
    
}
