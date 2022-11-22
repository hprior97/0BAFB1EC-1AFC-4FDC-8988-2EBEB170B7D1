import 'jasmine';
import { StudentResponse, Response, Result } from '../models/student-response';
import { FeedbackService } from '../services/feedback-service';
import { Student } from '../models/student';

// describe("add", () => {
//   it("should add two numbers", () => {
// 	expect(add(1, 2)).toBe(3);
//   });
// });

describe("get incorrect question", () => {
	let feedbackWorker: FeedbackService = new FeedbackService();
	let student: Student = new Student("student1", 3);
	let response: Response = {questionId: "numeracy1", response: "option3"};
	let responses: Response[] = [response];
	let result: Result = {rawScore: 6};
	let testStudentResponse: StudentResponse = new StudentResponse("studentResponse1", "assessment1", "14/12/2019 10:31:00", "16/12/2019 10:00:00", student, responses, result);
	
	
	it("Should return a Question[]", () => {
		expect(feedbackWorker.getIncorrectQuestionDataForResponse(testStudentResponse)).toBeDefined();
	});
	
	it("Should only call getIncorrectQuestionDataForResponse() once", () => {
		let callCountSpy = spyOn(feedbackWorker, 'getIncorrectQuestionDataForResponse');
		feedbackWorker.getIncorrectQuestionDataForResponse(testStudentResponse);
		expect(callCountSpy.calls.count()).toBeGreaterThan(0);
	});

});

