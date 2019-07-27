import {IMemory} from './IMemory'

export default class ByteMemory extends Uint8Array implements IMemory {

	public constructor(length: number = 1) {
		super(length)
	}

}