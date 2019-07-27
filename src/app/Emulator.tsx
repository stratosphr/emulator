import React, {Component} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import {IMemory} from './core/memory/IMemory'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly ram: IMemory

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.ram = new ByteMemory(4096)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div />
		)
	}

}