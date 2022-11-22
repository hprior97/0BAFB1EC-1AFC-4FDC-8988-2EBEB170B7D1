import { BaseRepository } from "./base/base-repository";
import { StudentResponse } from "../models/student-response";
import { Assessment } from "../models/Assessment";
import { AssessmentRepository } from "./assessment-repository";

export class ResponseRepository extends BaseRepository<StudentResponse> {
	
	findStudentResponses(studentID: string, status: number = 0): StudentResponse[] {
		switch (status) {
			case 1: {
				return this._collection.filter(obj => {
					if(obj.completed !== undefined) {
						return obj.student.id === studentID;
					}
				});
			}
			case 2: {
				return this._collection.filter(obj => {
					if(obj.completed === undefined) {
						return obj.student.id === studentID;
					}
				})
			}
			default: {
				return this._collection.filter(obj => {
					return obj.student.id === studentID;
				});
			}
		} 
	}
	
	findStudentResponsesWithAssessmentData(studentID: string): StudentResponse[] {
		let assessmentRepository = new AssessmentRepository("assessments");
		
		//find the completed responses
		let completedResponses = this.findStudentResponses(studentID, 1);
		
		//Get a Set of the unique assessment IDs in completedResponses
		let assessmentIDs: string[] = [];
		for(let response of completedResponses) {
			assessmentIDs.push(response.assessmentId);
		}
		let uniqueAssessmentIDs = Array.from(new Set(assessmentIDs));
		
		//Get assessment info 
		let assessments: Assessment[] = [];
		for(let id of uniqueAssessmentIDs) {
			let assessment = assessmentRepository.findWithID(id);
			assessments.push(assessment);
		}
		
		//Map the assessment values into the StudentResponse 
		let matchAssessmentsToResponse = (value: StudentResponse) => {
			let assessment = assessments.find(obj => {
				return obj.id === value.assessmentId;
			});
			let newValue = new StudentResponse(value.id, value.assessmentId, value.assigned, value.started, value.student, value.responses, value.results, value.completed, assessment);
			
			return newValue;
		}
		
		return completedResponses.map(matchAssessmentsToResponse);
	}
	
}