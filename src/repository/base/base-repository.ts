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
				this._collection = students as Student[];
				break;
			}
			case "questions": {
				this._collection = questions as Question[];
				break;
			}
			case "responses": {
				this._collection = responses as StudentResponse[];
				break;
			}
			default: {
				this._collection = assessments as Assessment[];
				break;
			}
			
		}
	}
	
	
    findWithID(itemID: string): T {
        return this._collection.find(obj => {
			return obj.id === itemID;
		})
    }
	
}