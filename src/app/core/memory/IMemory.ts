import MemoryCounter from '../counters/MemoryCounter'

export interface IMemory {

	length: number

	counter(): MemoryCounter

}
