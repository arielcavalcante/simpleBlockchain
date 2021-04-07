const SHA256 = require('crypto-js/sha256');
const express = require('express');

// Servidor
const app = express();
function main(request, response, next) {
	response.send(JSON.stringify(dinglehopperCoin, null, 4));
}
app.get('/', main);
app.listen(process.env.PORT ?? 8080);

// Inicia a classe bloco, com seus atributos e metodos
class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash;
	}

	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.data)
		).toString();
	}
}

let today = new Date();
let currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getMilliseconds()} - ${today.getDate()}/${
	today.getMonth() + 1
}/${today.getFullYear()}`;

// Inicia a classe blockchain, com seus atributos e metodos
class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, '01/01/2021', 'Genesis Block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return `
				~Attempt to tamper with block ${currentBlock.index}'s hash~
				\n
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n`;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return `
				~Attempt to tamper with block ${previousBlock.index}'s hash~
				\n
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n🚨 ATTENTION: I HAVE BEEN MURDERED 👩 🚨
				\n`;
			}
		}

		return '\n\n its fine \n\n';
	}
}

// cria a moeda bruguzumba, um tipo de blockchain
let dinglehopperCoin = new Blockchain();

// faz n-1 transações de bruguzumbas de valores aleatórios (entre 0 e 20)
for (let i = 1; i < 15; i++) {
	dinglehopperCoin.addBlock(
		new Block(
			i,
			currentTime,
			{
				amount: Math.random() * 20,
			},
			this.previousHash
		)
	);
}

// dinglehopperCoin.chain[2].data = { amount: 300 };
// dinglehopperCoin.chain[3].calculateHash();

console.log(dinglehopperCoin.isChainValid());
