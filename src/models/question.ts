import { Response } from "./student-response" 

export interface Question {
	id: string,
	stem: string,
	type: string,
	strand: string,
	config: {
		options: ConfigOption[],
		key: string,
		hint: string
	},
	userResponse?: Response
}

export interface ConfigOption {
	id: string,
	label: string,
	value: string
}