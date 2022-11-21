export interface Read<T> {
	findWithID(id: string): T;
	
	// This interface could be greatly added to in order to handle more complex
	// data operations. From inserts, updates, deletions etc.
	// findWithID appears to be the only universally needed operation across all 
	// repositories in this instance
}