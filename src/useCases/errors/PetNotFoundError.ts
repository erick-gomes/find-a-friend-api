export class PetNotFoundError extends Error {
	constructor() {
		super('Pets not found')
	}
}
