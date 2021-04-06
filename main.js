const SHA256 = require('crypto-js/sha256');
const express = require('express');

const app = express();

function main(request, response, next) {
	response.send(JSON.stringify(dinglehopperCoin, null, 4));
}

app.get('/', main);

app.listen(process.env.PORT ?? 8080);

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
}
let today = new Date();
let currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getMilliseconds()} - ${today.getDate()}/${
	today.getMonth() + 1
}/${today.getFullYear()}`;

let dinglehopperCoin = new Blockchain();

for (let i = 1; i < 5; i++) {
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
