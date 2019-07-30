import {EDataLength} from './EDataLength'

export default class AMemory extends Array<number> {

	private readonly _dataLength: EDataLength

	public constructor(length: number, dataLength: EDataLength) {
		super(length)
		this.fill(0)
		this._dataLength = dataLength
	}

	public get dataLength(): EDataLength {
		return this._dataLength
	}

	public write(address: number, data: number): void {
		this[address % this.length] = data % (2 ** this.dataLength)
	}

	public read(address: number): number {
		return this[address % this.length]
	}

}