import React, {Component} from 'react'
import './css/Emulator.css'
import RAM from './core/RAM'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly ram: RAM

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.ram = new RAM(4096)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div />
		)
	}

}