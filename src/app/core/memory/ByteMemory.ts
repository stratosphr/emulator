import {EDataLength} from './EDataLength'
import AMemory from './AMemory'

export default class ByteMemory extends AMemory {

	constructor(length: number = 1) {
		super(length, EDataLength.BYTE)
	}

}