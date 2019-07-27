import {IMemory} from './IMemory'

export default class HalfWordMemory extends Uint16Array implements IMemory {

	public constructor(length: number = 1) {
		super(length)
	}

}