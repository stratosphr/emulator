import AMemory from '../memory/AMemory'

export default class MemoryPointer {

	private readonly _memoryLength: number
	private _address: number

	constructor(memory: AMemory, initialAddress: number = 0) {
		this._memoryLength = memory.length
		this._address = 0
		this.goTo(initialAddress)
	}

	public get address(): number {
		return this._address
	}

	public get memoryLength(): number {
		return this._memoryLength
	}

	public goTo(address: number) {
		this._address = (this.memoryLength + address) % this.memoryLength
	}

	public inc() {
		this.goTo(this._address + 1)
	}

	public dec() {
		this.goTo(this._address - 1)
	}

}