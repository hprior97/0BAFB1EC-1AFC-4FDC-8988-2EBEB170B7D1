#!/usr/bin/env node
import { ProgressService } from './services/progress-service';
import { FeedbackService } from './services/feedback-service';
import { Student } from './models/student';
import { StudentRepository } from './repository/student-repository';
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';

clear();
console.log(
	chalk.red(
		//figlet.textSync('ACER-Report', { horizontalLayout: 'half'})
		figlet.textSync('ACER Report')
	)
);

const repository = new StudentRepository("students");

const readLine = readline.createInterface({input, output, terminal: false});
askForStudentID();

function askForStudentID(): void {
	readLine.question("Student ID: ", (answer: string) => {
		let student: Student = repository.findWithID(answer);	
		if(student === undefined) {
			//console.log("Your Student ID could not be found. Please try again.\n");
			console.log(chalk.red("Your Student ID could not be found. Please try again.\n"));
			askForStudentID();
		} else {
			askForReportType(student);
		}
	});
}

function askForReportType(student: Student): void {
	readLine.question("Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ", (answer: string) => {
		if(answer === "2") {
			let progressWorker = new ProgressService();
			progressWorker.generateReport(student);
			askForStudentID();
		} else if(answer == "3") {
			let feedbackWorker = new FeedbackService();
			feedbackWorker.generateReport(student);
			askForStudentID();
		} else {
			console.log(chalk.yellow("This feature is still under development. Check back soon or try another report."));
			askForReportType(student);
		}
	})
}