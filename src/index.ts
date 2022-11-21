#!/usr/bin/env node
import { ProgressService } from './services/progress-service';
import { FeedbackService } from './services/feedback-service';
import { Student } from './models/student';
import { StudentRepository } from './repository/student-repository';
import { AssessmentRepository } from './repository/assessment-repository';
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
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