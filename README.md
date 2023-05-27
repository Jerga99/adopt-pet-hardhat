# Adopt Pet App - React JS, Solidity, Hardhat, Ethereum and Polygon.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. You need to have Metamask wallet to interact with this application: [install it from here](https://metamask.io/download/)

3. Clone or download this repository

4. Navigate into the project directory

   ```bash
   $ cd adopt-pet-hardhat
   ```

5. Install the requirements

   ```bash
   $ npm install
   ```

6. Install the requirements in frontend folder

   ```bash
   $ cd frontend
   $ npm install
   ```

7. run local hardhat server

   ```bash
   $ npx hardhat node
   ```
 
8. in other terminal tab, deploy the contract localy

   ```bash
   $ npx hardhat run scripts/deploy.js --network localhost
   ```

9. Run the frontend

   ```bash
   $ npm run frontend
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this app, check out the full course [tutorial](https://academy.eincode.com/courses/nft-marketplace-in-react-js-next-typescript-full-guide).
