import {IMemory} from './IMemory'

export default class WordMemory extends Uint32Array implements IMemory {

	public constructor(length: number = 1) {
		super(length)
	}

}