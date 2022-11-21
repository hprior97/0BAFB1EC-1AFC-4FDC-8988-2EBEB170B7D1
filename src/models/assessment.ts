export interface Assessment {
	id: string, 
	name: string, 
	questions: AssessmentQuestion[];
}

interface AssessmentQuestion {
	questionId: string, 
	position: number
}