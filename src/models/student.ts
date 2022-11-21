export class Student {
	constructor(
		public id: string, 
		public yearLevel: number,
		public firstName?: string, 
		public lastName?: string, 
	) {
		this.id = id;
		this.yearLevel = yearLevel;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}