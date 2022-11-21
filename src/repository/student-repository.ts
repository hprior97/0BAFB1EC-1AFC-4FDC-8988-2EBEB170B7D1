import { BaseRepository } from "./base/base-repository";
import { Student } from "../models/student";

export class StudentRepository extends BaseRepository<Student> {
	
	countOfStudents(): number {
		return this._collection.length;
	}
	
	allStudents(): Student[] {
		return this._collection;
	}
	
	
}