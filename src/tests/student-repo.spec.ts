import 'jasmine';
import { StudentRepository } from '../repository/student-repository';

describe("StudentRepo Tests", () => {
	let studentRepository = new StudentRepository("students");
	it("should return a number", () => {
		expect(studentRepository.countOfStudents()).toBeInstanceOf(Number);
	});
	
	it("should not be able to find a student", () => {
		expect(studentRepository.findWithID("student25")).toBeUndefined();
	})
	
});