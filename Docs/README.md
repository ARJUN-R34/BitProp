# BitProp

## Application of the project

BitProp is a solution to the growing problems of real estate data manipulation and land grabbing by influential and powerful people.
Lack of transparency in the traditional property details storing mechanism coupled with offline storage makes it vulnerable to theft and manipulation.
Using Ethereum Blockchain, both of these problems can be solved thereby restoring the trust of the people back in the system.

## Getting Started

### Prerequisites

Ensure you install the following prerequisites before running the app.
Run these commands from the project root directory.

```
sudo apt-get update
```
```
sudo apt-get install nodejs
```
```
npm install -g nodemon
```
Go to project folder
```
cd BitProp
```
```
npm install web3@1.0.0-beta.48
```
```
npm install -g ganache-cli
```
```
npm install -g truffle
```
Install the required dependencies using 
```
npm install
```
To start our private chain using the 5 accounts in the "node" folder, run,
```
geth --identity "miner" --networkid 4002 --datadir node --rpc --rpcport "8545" --unlock 0,1,2,3,4 --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal"
```
Open another console and run geth console using
```
geth attach
```
To start the miner, run the below command in the same terminal,
```
miner.start()
```

Open another console in the root directory and run the below command to start the node server,
```
nodemon start
```

Open your browser and go to localhost:3000 to interact with the app.