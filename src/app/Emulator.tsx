import React, {Component} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import MemoryCounter from './core/counters/MemoryCounter'
import HalfWordMemory from './core/memory/HalfWordMemory'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly ram: ByteMemory
	private readonly pc: MemoryCounter
	private readonly v: ByteMemory
	private readonly i: HalfWordMemory
	private readonly stack: HalfWordMemory
	private readonly jumpCounter: MemoryCounter
	private readonly gameCounter: ByteMemory
	private readonly soundCounter: ByteMemory

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.ram = new ByteMemory(4096)
		this.pc = new MemoryCounter(this.ram, 512)
		this.v = new ByteMemory(16)
		this.i = new HalfWordMemory()
		this.stack = new HalfWordMemory(16)
		this.jumpCounter = new MemoryCounter(this.stack)
		this.gameCounter = new ByteMemory()
		this.soundCounter = new ByteMemory()
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div />
		)
	}

}