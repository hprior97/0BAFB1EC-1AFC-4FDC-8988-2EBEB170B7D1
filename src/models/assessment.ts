export interface Assessment {
	id: string, 
	name: string, 
	questions: AssessmentQuestion[]
}

interface AssessmentQuestion {
	questoinId: string, 
	position: number
}