import 'jasmine';
import { StudentResponse } from '../models/student-response';
import { FeedbackService } from '../services/feedback-service';
import { Student } from '../models/student';

// describe("add", () => {
//   it("should add two numbers", () => {
// 	expect(add(1, 2)).toBe(3);
//   });
// });

describe("get incorrect question", () => {
	let feedbackWorker: FeedbackService = new FeedbackService();
	
	let testStudentResponse: StudentResponse = {
		"id": "studentReponse1",
		"assessmentId": "assessment1",
		"assigned": "14/12/2019 10:31:00",
		"started": "16/12/2019 10:00:00",
		"completed": "16/12/2019 10:46:00",
		"student": {
		  "id": "student1",
		  "yearLevel": 3
		},
		"responses": [
		  {
			"questionId": "numeracy1",
			"response": "option3"
		  }, {
			"questionId": "numeracy2",
			"response": "option4"
		  }, {
			"questionId": "numeracy3",
			"response": "option2"
		  }, {
			"questionId": "numeracy4",
			"response": "option1"
		  }, {
			"questionId": "numeracy5",
			"response": "option1"
		  }, {
			"questionId": "numeracy6",
			"response": "option1"
		  }, {
			"questionId": "numeracy7",
			"response": "option4"
		  }, {
			"questionId": "numeracy8",
			"response": "option4"
		  }, {
			"questionId": "numeracy9",
			"response": "option1"
		  }, {
			"questionId": "numeracy10",
			"response": "option1"
		  }, {
			"questionId": "numeracy11",
			"response": "option1"
		  }, {
			"questionId": "numeracy12",
			"response": "option1"
		  }, {
			"questionId": "numeracy13",
			"response": "option3"
		  }, {
			"questionId": "numeracy14",
			"response": "option2"
		  }, {
			"questionId": "numeracy15",
			"response": "option1"
		  }, {
			"questionId": "numeracy16",
			"response": "option1"
		  }
		],
		"results": {
		  "rawScore": 6
		}
	  };
	  
	let testStudent: Student = {
		"id": "student1",
		"firstName": "Tony",
		"lastName": "Stark",
		"yearLevel": 6
	  }
	
	
	it("Should return a Question[]", () => {
		expect(feedbackWorker.getIncorrectQuestionDataForResponse(testStudentResponse)).toBeDefined();
	});

});