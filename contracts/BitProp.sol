pragma solidity ^0.5.0;

contract Land {
    
    
    //Property Details Structure
    struct PropertyDetails {
        Status status;
        string region;
        uint value;
        address currowner;
    }
    
    
    enum Status { NotExist, Pending, Approved, Rejected }
    
    
    //Admin Details Structure
    struct Admin {
        string region;
        address adminaddress;
    }
    
    
    //Approved Users List
    struct ApprovedUsers {
        address approved_address;
    }
    
    
    //State variables
    address public creatorAdmin;
    uint public adminCount;
    uint public usercount;
    uint propertyCount;
    
    
    //Mappings 
    mapping(uint => PropertyDetails) properties;
    
    mapping(address => PropertyDetails) property_details;
    
    mapping(uint => Admin) public admins;
    
    mapping(uint => ApprovedUsers) public approved_users;
	
    mapping(address => int) public users;
    
    mapping(address => bool) verifiedUsers;
    
    
    //Modifiers
    modifier onlyOwner(uint _id) {
        require(users[msg.sender] == 2 && approved_users[_id].approved_address == msg.sender);
        _;
    }
    
    
    modifier isAdmin() {
        require(users[msg.sender] == 3 && verifiedUsers[msg.sender] == true);
        _;
    }
    
    
    //Constructor to set the contract creator as the admin
    constructor() public {
        creatorAdmin = msg.sender;
        users[creatorAdmin] = 3;
        verifiedUsers[creatorAdmin] = true;
    }
    
    
    //Appoint an Admin
    function createAdmin(string memory _region, address _address) public returns(bool) {
        require(msg.sender == creatorAdmin);
        adminCount++;
        admins[adminCount] = Admin(_region, _address);
        users[_address] = 3;
        verifiedUsers[_address] = true;
        return true;
    }
    
    
    //Appoint a User
    function createUser(address _useraddress) public isAdmin returns(bool) {
        require(users[_useraddress] != 2 && users[_useraddress] != 3);
        usercount++;
        approved_users[usercount] = ApprovedUsers(_useraddress);
        users[_useraddress] = 2;
        verifiedUsers[_useraddress] = true;
    }
    
    
    //Create a new Property
    function createProperty(string memory _region, uint _value, address _currowner, uint _id) public onlyOwner(_id) returns(bool) {
        propertyCount++;
        properties[propertyCount] = PropertyDetails(Status.Pending ,_region, _value, _currowner);
        return true;
    }
    
    
    //Approve the Property
    function approveProperty(uint _id) public isAdmin returns(bool) {
        require(properties[_id].currowner != msg.sender);
        properties[_id].status = Status.Approved;
		return true;
    }
    
    
    //Reject the Property
    function rejectProperty(uint _id) public isAdmin returns(bool) {
        require(properties[_id].currowner != msg.sender);
        properties[_id].status = Status.Rejected;
		return true;
    }
    
    
    //Transfer of Ownership
    function propertyTransfer(uint _id, address _currowner, address _newowner) public returns(bool) {
        require(properties[_id].currowner != _newowner && _currowner != _newowner);
        require(verifiedUsers[_newowner] == true && users[_newowner] == 2);
        properties[_id].status = Status.Pending;
		return true;
    } 
    
    
    //Accept transfer of ownership
    function acceptOwnershipTransfer(uint _id, address _newowner) public isAdmin returns(bool) {
        require(properties[_id].currowner != _newowner && properties[_id].status == Status.Pending);
        require(verifiedUsers[_newowner] == true && users[_newowner] == 2);
	    properties[_id].currowner = _newowner;
	    properties[_id].status = Status.Approved;
	    return true;
    }
    
    
    //Get Property Details
    function getPropertyDetails(uint _id) public view returns (Status _status, string memory _region, uint _value, address _currowner) {
		return (_status = properties[_id].status, _region = properties[_id].region, _value = properties[_id].value, _currowner = properties[_id].currowner);
	}
    
    
}