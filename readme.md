# English Auction Smart Contract

This is a Solidity smart contract for an English auction, implemented using the Truffle Suite, which includes Truffle for smart contract development and Ganache for a local Ethereum test network.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contract Details](#smart-contract-details)
- [License](#license)

## Overview

An English auction is a type of auction where the highest bidder wins, and the price increases incrementally with each bid. This smart contract provides the functionality to create and manage English auctions on the Ethereum blockchain.

## Getting Started

### Prerequisites

Before getting started, you need to have the following tools installed on your system:

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)

### Installation

1. Clone this repository:

   ```shell
   git clone 
   ```

2. Navigate to the project directory:

    ```shell
    cd english-auction-smart-contract
    ```

3. Install the project dependencies:

    ```shell
    npm install
    ```

4. Start Ganache for local development:

    ```shell
    ganache-cli
    ```

5. Compile the smart contracts:

    ```shell
    truffle compile
    ```

6. Migrate the smart contracts to your local blockchain:

    ```shell
    truffle migrate --network development
    ```

### Usage

The Contract will be automatically run when deployed to show the different use cases.

### Smart Contract Details

The main smart contract file is located in the contracts/ EnglishAuction.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

If you have any questions or issues, please feel free to reach out to [mhmd.lhsn@outlook.com](mailto:mhmd.lhsn@outlook.com).

Happy auctioning!
