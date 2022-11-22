import { StudentResponse } from "../models/student-response";
import { Student } from '../models/student';
import { ResponseRepository } from '../repository/response-repository';

export class ProgressService {
	
	constructor() { }
	
	generateReport(student: Student): void {
		let reportData = this.getReportData(student.id);
		
		for(let assessmentID of Object.keys(reportData)) {
			let responses = reportData[assessmentID] as StudentResponse[];
			this.outputReportData(responses, responses.length, student);
		}
		
		
	}
	
	private getReportData(studentID: string): any {
		const responseRepository = new ResponseRepository("responses");
		
		let completedResponses = responseRepository.findStudentResponsesWithAssessmentData(studentID);
		
		//sort the completed response array based on time
		completedResponses.sort((objA, objB) => objA.getCompletedDate().getTime() - objB.getCompletedDate().getTime());
		
		//Group the responses by their assessmentIDs
		let group = completedResponses.reduce((r: any, a: any) => {
			r[a.assessmentId] = [...r[a.assessmentId] || [], a];
			return r;
		}, {});
		
		return group;
	}	
	
	private outputReportData(studentResponses: StudentResponse[], attempts: number, student: Student): void {
		let studentLastName = student.lastName ? student.lastName : "lastname";
		let studentFirstName = student.firstName ? student.firstName : "firstname";
		let assessmentName = studentResponses[0].assessment ? studentResponses[0].assessment.name : "-";
		
		var responseString = "\n" + studentFirstName + " " + studentLastName + " has completed " + assessmentName + " " + attempts + " times in total. Date and raw score given below:\n\n";
		var detailStrings: string[] = [];
		for(let response of studentResponses) {
			var responseStringDetail = "Date: " + response.completed + ", Raw Score: " + response.results.rawScore + " out of " + response.responses.length;
			detailStrings.push(responseStringDetail);
		}
		let responseDetail = detailStrings.join("\n");
		console.log(responseString + responseDetail + "\n");
		
		if(studentResponses.length > 1) {
			let mostRecentAttempt = studentResponses[studentResponses.length -1].results.rawScore;
			let oldestAttempt = studentResponses[0].results.rawScore;
			let scoreDifference = mostRecentAttempt - oldestAttempt;
			let comparative = scoreDifference >= 0 ? "more" : "less";
			let absoluteDifference = Math.abs(mostRecentAttempt - oldestAttempt);
			
			console.log(studentFirstName + " " + studentLastName + " got " + absoluteDifference + " " + comparative + " correct in the recent completed assessment than the oldest\n");
		}
		
		console.log("-------------------");		
	}
	
}