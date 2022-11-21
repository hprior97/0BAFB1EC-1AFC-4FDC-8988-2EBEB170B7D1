export interface Read<T> {
	findWithID(id: string): T;
}