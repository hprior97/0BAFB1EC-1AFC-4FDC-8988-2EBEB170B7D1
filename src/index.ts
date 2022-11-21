#!/usr/bin/env node
import chalk from 'chalk';
const clear = require('clear');
const figlet = require('figlet');

clear();
console.log(
	chalk.red(
		figlet.textSync('ACER-Report', { horizontalLayout: 'half'})
	)
);

export function add(value1: number, value2: number): number {
	return value1 + value2;
}