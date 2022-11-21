import { Read } from '../interfaces/Read';
import { Student } from '../../models/student';
import { Question } from '../../models/Question';
import { StudentResponse } from '../../models/student-response';
import { Assessment } from '../../models/Assessment';
import students from '../../assets/students.json';
import questions from '../../assets/questions.json';
import responses from '../../assets/student-responses.json';
import assessments from '../../assets/assessments.json';

export abstract class BaseRepository<T> implements Read<T> {
	
	public readonly _collection: any[];
	
	constructor(collectionName: string) {
		switch (collectionName) {
			case "students": {
				this._collection = students;
				break;
			}
			case "questions": {
				this._collection = questions;
				break;
			}
			case "responses": {
				this._collection = responses;
				break;
			}
			default: {
				this._collection = assessments;
				break;
			}
			
		}
	}
	
	
    findWithID(id: string): T {
        throw new Error('Method not implemented.');
    }
	
}