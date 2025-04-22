export class PetAlreadyExistsError extends Error {
	constructor() {
		super('Pet already exists')
	}
}
