import { StudentResponse } from "../models/student-response";
import { QuestionRepository } from '../repository/question-repository';
import { ResponseRepository } from "../repository/response-repository";
import { Student } from '../models/student';
import { Question } from "../models/Question";

export class FeedbackService {
	private questionRepository = new QuestionRepository("questions");
	
	constructor() { }
	
	
}