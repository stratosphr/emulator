import React, {Component, RefObject} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import MemoryCounter from './core/counters/MemoryCounter'
import HalfWordMemory from './core/memory/HalfWordMemory'
import Screen from './core/graphics/Screen'

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
		this.screenRef.current!.randomizePixelsColors()
		this.screenRef.current!.setPixelColor({x: 3, y: 9}, 'red')
		this.screenRef.current!.setPixelColor({x: 0, y: 0}, 'cyan')
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Screen position={{x: 100, y: 100}} definition={{width: 640, height: 320}} pixelsDimensions={{width: 20, height: 20}} ref={this.screenRef} />
		)
	}

}