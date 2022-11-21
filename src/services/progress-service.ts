import { StudentResponse } from "../models/student-response";
import { Student } from '../models/student';
import { ResponseRepository } from '../repository/response-repository';

export class ProgressWorker {
	
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
		var responseString = "\n" + studentFirstName + " " + studentLastName + " has completed " + studentResponses[0].assessment?.name + " " + attempts + " times in total. Date and raw score given below:\n\n";
		var detailStrings: string[] = [];
		for(let response of studentResponses) {
			var responseStringDetail = "Date: " + response.completed + ", Raw Score: " + response.results.rawScore + " out of " + response.responses.length;
			detailStrings.push(responseStringDetail);
		}
		let responseDetail = detailStrings.join("\n");
		console.log(responseString + responseDetail + "\n");
	}
}