import { Student } from './student';
import { Assessment } from './assessment';
import { ConfigOption } from './question';

export class StudentResponse {
	private completedDate: Date;
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
		this.completedDate = this.assignDateObject(completed);
	}
	
	private assignDateObject(dateString?: string): Date {
		if(dateString !== undefined) {
			let dateStringPieces = dateString.split(' ');
			let dateComponents = dateStringPieces[0];
			let timeComponents = dateStringPieces[1];
			
			let datePieces = dateComponents.split('/');
			let day = parseInt(datePieces[0]);
			let month = parseInt(datePieces[1]);
			let year = parseInt(datePieces[2]);
			
			let timePieces = timeComponents.split(":");
			let hours = parseInt(timePieces[0]);
			let minutes = parseInt(timePieces[1]);
			let seconds = parseInt(timePieces[2]);
			
			return new Date(year, month - 1, day, hours, minutes, seconds);
		} else {
			return new Date(0);
		}
	}
	
	public getCompletedDate(): Date {
		return this.completedDate;
	}
}

export interface Result {
	rawScore: number
}

export interface Response {
	questionId: string, 
	response: string,
	userChoice?: ConfigOption,
	correctChoice?: ConfigOption
}