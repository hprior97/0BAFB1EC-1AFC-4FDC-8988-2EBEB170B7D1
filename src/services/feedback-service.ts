import { StudentResponse } from "../models/student-response";
import { QuestionRepository } from '../repository/question-repository';
import { ResponseRepository } from "../repository/response-repository";
import { Student } from '../models/student';
import { Question } from "../models/Question";

export class FeedbackService {
	private questionRepository = new QuestionRepository("questions");
	
	constructor() { }
	
	genReport(student: Student): void {
		
		let responseRepository = new ResponseRepository("responses");
		
		//Find the recent completed assessments, with required assessmentdata. See response-repository.ts
		let completedResponses = responseRepository.findStudentResponsesWithAssessmentData(student.id);
		
		//Get the incorrect questions, and build an array of type FeedbackData with proper values
		//NOTE include in readme the problem here, these should be listed underneath the assessment records in json
		let fullResponseData: FeedbackData[] = [];
		
		for(let completedResponse of completedResponses) {
			let incorrectQuestions = this.getIncorrectQuestionDataForResponse(completedResponse);
			let fullResponse: FeedbackData = {completedResponse, incorrectQuestions};
			fullResponseData.push(fullResponse);
			
		}
		
		//console.log(fullResponseData[0]);
		for(let fullResponse of fullResponseData) {
			this.outputReportData(student, fullResponse);
		}
		
	}
	
	outputReportData(student: Student, feedbackData: FeedbackData): void {
		let studentLastName = student.lastName ? student.lastName : "lastname";
		let studentFirstName = student.firstName ? student.firstName : "firstname";
		let assessmentName = feedbackData.completedResponse.assessment ? feedbackData.completedResponse.assessment.name : "Unknown Assessment Name";
		let completed = feedbackData.completedResponse.completed ? feedbackData.completedResponse.completed : "Unknown Completion Date";
		let correctQuestionTotal = feedbackData.completedResponse.responses.length - feedbackData.incorrectQuestions.length;
		
		let assessmentFeedbackHeader = "\n---------------------------\n" + studentFirstName + " " + studentLastName + " recently completed " + assessmentName + " on " + completed + "\nHe got " + correctQuestionTotal + " questions right out of " + feedbackData.completedResponse.responses.length + ". Feedback for wrong answers given below\n\n";
		
		console.log(assessmentFeedbackHeader);
		
		//loop through the incorrect responses and output the data
		for(let incorrectQuestion of feedbackData.incorrectQuestions) {
			var questionStrings: string[] = [];
			questionStrings.push("Question: " + incorrectQuestion.stem);
			questionStrings.push("Your answer: " + incorrectQuestion.userResponse!.userChoice!.label + " with value " + incorrectQuestion.userResponse!.userChoice!.value);
			questionStrings.push("Right answer: " + incorrectQuestion.userResponse!.correctChoice!.label + " with value " + incorrectQuestion.userResponse!.correctChoice!.value);
			questionStrings.push("Hint: " + incorrectQuestion.config.hint + "\n");
			let questionDetailString = questionStrings.join("\n");
			console.log(questionDetailString);
			
		}
	}
	
	getIncorrectQuestionDataForResponse(studentResponse: StudentResponse): Question[] {
		let incorrectQuestions: Question[] = [];
		for(let questionResponse of studentResponse.responses) {
			//find the actual question and insert it into the array
			let question = this.questionRepository.findWithID(questionResponse.questionId);
			if(question.config.key !== questionResponse.response) {
				let correctChoice = question.config.options.find(obj => {
					return obj.id === question.config.key;
				});
				let userChoice = question.config.options.find(obj => {
					return obj.id === questionResponse.response;
				})
				questionResponse.correctChoice = correctChoice;
				questionResponse.userChoice = userChoice;
				question.userResponse = questionResponse;
				incorrectQuestions.push(question);
			}
		}
		
		return incorrectQuestions;
	}
	
}

interface FeedbackData {
	completedResponse: StudentResponse,
	incorrectQuestions: Question[]
}