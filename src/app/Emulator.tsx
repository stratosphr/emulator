import React, {Component, RefObject} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import MemoryCounter from './core/counters/MemoryCounter'
import HalfWordMemory from './core/memory/HalfWordMemory'
import Screen from './core/graphics/Screen'
import System from './core/system/System'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private readonly screenRef: RefObject<Screen>
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
		this.screenRef = React.createRef<Screen>()
		this.ram = new ByteMemory(4096)
		this.pc = new MemoryCounter(this.ram, 512)
		this.v = new ByteMemory(16)
		this.i = new HalfWordMemory()
		this.stack = new HalfWordMemory(16)
		this.jumpCounter = new MemoryCounter(this.stack)
		this.gameCounter = new ByteMemory()
		this.soundCounter = new ByteMemory()
	}

	public componentDidMount(): void {

	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<System>
				<Screen position={{x: 100, y: 100}} definition={{width: 64, height: 32}} pixelsDimensions={{width: 10, height: 10}} refreshFrequency={250} display={true} ref={this.screenRef} />
			</System>
		)
	}

}