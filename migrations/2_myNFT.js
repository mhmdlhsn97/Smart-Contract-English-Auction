//to generate a token id
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const mytoken = artifacts.require("MyNFT");
//export module which takes deployer as a function
//var accounts = web3.eth.getAccounts();
var tokenID = randomIntFromInterval(1, 5000);
console.log("Token ID : " + tokenID);
//console.log("accounts:"+accounts+"\n");
const myAuction = artifacts.require('EnglishAuction')
var f;
var start_bid = 5; //wei 
module.exports = async function (deployer, networks, accounts) {
  console.log("accounts:" + accounts + "\n");
  //deploy the contract
  deployer.then(async () => {
    await deployer.deploy(mytoken);
    const token_ = await mytoken.deployed();

    console.log("contract address: " + token_);
    f = await token_.mint(accounts[0], tokenID);
    let auctionAddress = await deployer.deploy(myAuction, token_.address, tokenID, start_bid);
    console.log("the auctionAddress : " + auctionAddress.address);
    const auction_ = await myAuction.deployed();
    //approve auction contract to use NFT
    let x = await token_.approve(auctionAddress.address, tokenID);
    //console.log("the x : "+ x.tx);
    //start the auction
    await auction_.start();


    //bids and withdaraws
    await auction_.bid({ from: accounts[1], value: 10 });
    await auction_.bid({ from: accounts[3], value: 11 });
    await auction_.bid({ from: accounts[2], value: 13 });
    console.log("highest Bid: " + await auction_.highestBid());
    await auction_.withdraw({ from: accounts[2] });

    console.log("highest Bid: " + await auction_.highestBid());
    await auction_.bid({ from: accounts[5], value: 100000000000000000 });
    //big number since it's in wei
    // 1 eth = 1000000000000000000
    // 1 eth =  1000000000 Gwei
    await auction_.bid({ from: accounts[1], value: 400000000000000000 });
    console.log("highest Bid at end: " + await auction_.highestBidder());
    //check if auction ended
    console.log("Has the contract ended: " + await auction_.ended()+"\nwait 17 sec because of slow PC processing of blocks");

    //wait 17 sec because of slow PC processing of blocks

    console.log("Wait for Timeout to BLOCK");
    await timeout(17000);


    // this is made to create a block after 17 sec since ganache doesn't work like a normal blockchain and will just use 1 tx for 1 block creation when sent
    //this proves that no one can bet after the time at the end have elapsed
    try {
      await auction_.bid({ from: accounts[7], value: 500000000000000000 })
    } catch (error) {
      console.log("the contract has: "+error['reason']+" this is made to create a block after 17 sec since ganache doesn't work like a normal blockchain and will just use 1 tx for 1 block creation when sent"
      +"this proves that no one can bet after the time at the end have elapsed");
    }
    //this will show the same account as the last log of highest bidder()
    console.log("highest Bid after wait: " + await auction_.highestBidder()+"\nif it is account[1]: "+accounts[1]+" then the bid is correct.");
    //end auction
    try {
      await auction_.end();
    } catch (error) {
      console.log(error);
    }
    console.log("new owner of NFT " + tokenID + " default : " + await token_.ownerOf(tokenID));
    //console.log("ended??? : " + await auction_.ended());
  })

};

