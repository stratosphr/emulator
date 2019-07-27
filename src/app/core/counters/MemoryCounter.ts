import {IMemory} from '../memory/IMemory'

export default class MemoryCounter {

	private readonly _memoryLength: number

	constructor(memory: IMemory) {
		this._memoryLength = memory.length
		this._address = 0
	}

	private _address: number

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