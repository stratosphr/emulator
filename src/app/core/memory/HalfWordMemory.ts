import AMemory from './AMemory'
import {EDataLength} from './EDataLength'

export default class HalfWordMemory extends AMemory {

	constructor(length: number = 1) {
		super(length, EDataLength.HALF_WORD)
	}

}