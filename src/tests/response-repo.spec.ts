import 'jasmine';
import { ResponseRepository } from '../repository/response-repository';

describe("Student Response Repo", () => {
	let responseRepository = new ResponseRepository("responses");
	
	it("Should return only values that contains an Assessment property", () => {
		let responses = responseRepository.findStudentResponsesWithAssessmentData("student1");
		for(let response of responses) {
			expect(response.assessment).toBeDefined();
		}
	});
	
	it("Should not contain an assessment property", () => {
		let responses = responseRepository.findStudentResponses("student1", 1);
		for(let response of responses){
			expect(response.assessment).toBeUndefined();
		}
	});
	
	it("Should not return any completed items", () => {
		let incompleteRsponses = responseRepository.findStudentResponses("student1", 2);
		for(let response of incompleteRsponses) {
			expect(response.completed).toBeUndefined();
		}
	})
	
	it("Should return only completed items", () => {
		let completedResponses = responseRepository.findStudentResponses("student1", 1);
		for(let response of completedResponses) {
			expect(response.completed).toBeDefined();
		}
	})
})