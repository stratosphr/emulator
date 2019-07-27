import {IMemory} from './IMemory'
import MemoryCounter from '../counters/MemoryCounter'

export default class WordMemory extends Uint32Array implements IMemory {

	public constructor(length: number) {
		super(length)
	}

	public counter(): MemoryCounter {
		return new MemoryCounter(this)
	}

}