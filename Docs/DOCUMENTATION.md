# BitProp

## SUPERADMIN

The Superadmin is the creator of the contract. It gets initialised in the constructor of the smart contract and is assigned to the variable creatorAdmin.

### Functions

The SuperAdmin is the one who has the right to assign the Admins (Registrars)

## Registrar

The Registrar is the admin which is created by the SuperAdmin.

### Functions

The functions of the Registrar includes : 1. Creating the User.  2. View the property details of the users.  3. Approve or Reject the request to register a property.  4. Approve or Reject the request for a transfer of ownership of a property.

## User

The User is the lowest privileges in the hierarchy and is for the end users.

### Functions

The User can do functions like : 1. Adding the property details for the registration.  2. Applying to the Registrar for transfer of ownership of the property.  3. Viewing their property details.

The smart Contract flow is given in the flowchart "Smart Contract Flow.png"

## Code Flow

The entry point of the app is in the index.js file in routes. Various other user specific routing and functions are provided in their respective routing file.
There are separate routing for user, registrar and superadmin.
The coinbase address has to be provided in the coinbase variable in App.js file.
The contract instance name is 'Contract' and the contractaddress and abi are fetched from the folder Land.json under /build/contracts .