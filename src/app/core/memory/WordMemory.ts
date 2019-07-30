import AMemory from './AMemory'
import {EDataLength} from './EDataLength'

export default class WordMemory extends AMemory {

	constructor(length: number = 1) {
		super(length, EDataLength.WORD)
	}

}