import React, {Component, RefObject} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import MemoryPointer from './core/counters/MemoryPointer'
import HalfWordMemory from './core/memory/HalfWordMemory'
import Screen from './core/graphics/Screen'
import System from './core/system/System'
import Memory from './core/memory/Memory'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly screenRef: RefObject<Screen>
	private readonly ram: ByteMemory
	private readonly pc: MemoryPointer
	private readonly v: ByteMemory
	private readonly i: HalfWordMemory
	private readonly stack: HalfWordMemory
	private readonly stackPointer: MemoryPointer
	private readonly gameCounter: ByteMemory
	private readonly soundCounter: ByteMemory

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.screenRef = React.createRef<Screen>()
		this.ram = new ByteMemory(4096)
		this.pc = new MemoryPointer(this.ram, 512)
		this.v = new ByteMemory(16)
		this.i = new HalfWordMemory()
		this.stack = new HalfWordMemory(16)
		this.stackPointer = new MemoryPointer(this.stack)
		this.gameCounter = new ByteMemory()
		this.soundCounter = new ByteMemory()
		this.ram.write(4096, 42)
		this.ram.write(10, 45)
		this.stack.write(3, (2 ** 16) - 1)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<System>
				<Screen position={{x: 400, y: 100}} definition={{width: 64, height: 32}} pixelsDimensions={{width: 5, height: 5}} refreshFrequency={250} display={false} ref={this.screenRef} />
				<Memory name={'RAM'} memory={this.ram} pointers={[this.pc]} />
				<Memory name={'V'} memory={this.v} pointers={[]} />
				<Memory name={'Stack'} memory={this.stack} pointers={[this.stackPointer, new MemoryPointer(this.ram, 3)]} />
			</System>
		)
	}

}