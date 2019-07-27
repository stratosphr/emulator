import {IMemory} from './IMemory'

export default class WordMemory extends Uint32Array implements IMemory {

	public constructor(length: number) {
		super(length)
	}

}