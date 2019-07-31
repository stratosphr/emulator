interface IInstrMapping {

	id: number
	mask: number
	execute: (instruction: number) => void
	description?: string

}

export default class Interpreter {

	private mappings: IInstrMapping[]

	constructor(mapping: IInstrMapping[]) {
		this.mappings = mapping
	}

	public execute(instruction: number) {
		for (let mappingIndex = 0; mappingIndex < this.mappings.length; mappingIndex++) {
			if ((instruction & this.mappings[mappingIndex].mask) === this.mappings[mappingIndex].id) {
				this.mappings[mappingIndex].execute(instruction)
				break
			}
		}
	}

}