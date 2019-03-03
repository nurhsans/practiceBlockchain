const Wallet = require('../wallet')
const Transaction = require('../wallet/transaction')

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.wallet = wallet
        this.p2pServer = p2pServer
    }

        // grab transactions from pool
        // make block
        // sync chains with new block
        // clear the transactions pool coz it's already in the chain
        // broadcast to other mners to clear the transaction pool
        // get reward for miner
    mine() {
        const validTransactions = this.transactionPool.validTransactions()
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()))

        const block = this.blockchain.addBlock(validTransactions)
        this.p2pServer.syncChains()
        this.transactionPool.clear()
        this.p2pServer.broadcastClearTransaction()

        return block
    }
}

module.exports = Miner