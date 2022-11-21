import { Student } from './student';
import { Assessment } from './assessment';
import { ConfigOption } from './question';

export class StudentResponse {
	private completedDate: Date | undefined;
	constructor(
		public id: string,
		public assessmentId: string,
		public assigned: string,
		public started: string,
		public student: Student,
		public responses: Response[],
		public results: Result,
		public completed?: string,
		public assessment?: Assessment
	) {
		this.id = id;
		this.assessmentId = assessmentId;
		this.assigned = assigned;
		this.started = started;
		this.student = student;
		this.responses = responses;
		this.results = results;
		this.completed = completed;
		this.assessment = assessment;
		this.completedDate = this.assignCompletedDateObject(completed);
	}
	
	assignCompletedDateObject(dateString?: string): Date | undefined {
		if(dateString) {
			const stringSplit = dateString.split(' ');
			const dateStringSplit = stringSplit[0];
			const timeStringSplit = stringSplit[1];
			
			const [day, month, year] = dateStringSplit.split('/');
			const [hours, minutes, seconds] = timeStringSplit.split(':');
			
			return new Date(+year, +month - 1, +day, +hours, +minutes, + seconds);
		}
	}
}

interface Result {
	rawScore: number
}

export interface Response {
	questionId: string, 
	response: string,
	userChoice?: ConfigOption,
	correctChoice?: ConfigOption
}