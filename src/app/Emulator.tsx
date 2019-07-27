import React, {Component} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import {IMemory} from './core/memory/IMemory'
import MemoryCounter from './core/counters/MemoryCounter'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly ram: IMemory
	private pc: MemoryCounter

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.ram = new ByteMemory(4096)
		this.pc = this.ram.counter()
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div />
		)
	}

}