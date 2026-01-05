import 'dotenv/config';
import viem from 'viem'; 
import express from 'express';


const nodeUrl = process.env.NODE_URL || "";
const userAddress = process.env.USER_ADDRESS || "";
const startBlock = process.env.START_BLOCK ? parseInt(process.env.START_BLOCK) : 0;
const nbBlocks = process.env.NB_BLOCKS ? parseInt(process.env.NB_BLOCKS) : 0;
// const transactionHash = process.env.TRANSACTION_HASH || "";

const transport = nodeUrl.startsWith("ws") ? viem.webSocket(nodeUrl) : viem.http(nodeUrl);
const client = viem.createPublicClient({transport});
let running = false;

function main() {
  if (!nbBlocks) throw new Error("NB_BLOCKS environment variable must be set to a positive integer.");
  if (!nodeUrl) throw new Error("NODE_URL environment variable must be set.");

  const balance = await client.getBalance({address: userAddress as `0x${string}`});
  console.log(`Balance of address ${userAddress}: ${viem.formatEther(balance)} ETH`);
  const endBlock = startBlock + nbBlocks;

  running = true;
  for (let blockNumber = startBlock; blockNumber < endBlock; blockNumber++) {
    const block = await client.getBlock({blockNumber: BigInt(blockNumber), includeTransactions: true});
    console.log(`Block Number: ${block.number} with ${block.transactions.length} transactions`);
    
    for (const tx of block.transactions) {
      const receipt = await client.getTransactionReceipt({hash: tx.hash});
      if (receipt.contractAddress) {
        console.log(`  Contract Creation Transaction: ${tx.hash} created contract at ${receipt.contractAddress}`);
      }
    }
  }
  running = false;
  console.log("Finished processing blocks. Restarting in 10 seconds...");
  setTimeout(main, 10_000); // Wait for 10 seconds before repeating
};

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const curentBlock = client.getBlockNumber();
  const balance = await client.getBalance({address: userAddress as `0x${string}`});
  res.json({
    msg:'Ethereum Block Monitor is running. Check the console for output.',
    currentBlock: Number(curentBlock),
    balance: viem.formatEther(balance) + ' ETH',
    processing: running
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


main().catch((error) => {
  console.error("Error executing main:", error);
  process.exit(1);
});