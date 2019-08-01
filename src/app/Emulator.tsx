import React, {Component, RefObject} from 'react'
import './css/Emulator.css'
import ByteMemory from './core/memory/ByteMemory'
import MemoryPointer from './core/counters/MemoryPointer'
import HalfWordMemory from './core/memory/HalfWordMemory'
import Screen from './core/graphics/Screen'
import System from './core/system/System'
import Memory from './core/memory/Memory'
import Interpreter from './core/interpreter/Interpreter'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	private poweredOn: boolean
	private readonly screenRef: RefObject<Screen>
	private readonly ram: ByteMemory
	private readonly pc: MemoryPointer
	private readonly v: ByteMemory
	private readonly i: HalfWordMemory
	private readonly stack: HalfWordMemory
	private readonly stackPointer: MemoryPointer
	private readonly gameCounter: ByteMemory
	private readonly soundCounter: ByteMemory
	private readonly instructionInterpreter: Interpreter

	constructor(props: Readonly<IEmulatorProps>) {
		super(props)
		this.screenRef = React.createRef<Screen>()
		this.ram = new ByteMemory(1024)
		this.pc = new MemoryPointer(this.ram, 512)
		this.v = new ByteMemory(16)
		this.i = new HalfWordMemory()
		this.stack = new HalfWordMemory(16)
		this.stackPointer = new MemoryPointer(this.stack)
		this.gameCounter = new ByteMemory()
		this.soundCounter = new ByteMemory()
		this.poweredOn = true
		this.v.write(0, 2)
		this.v.write(1, 5)
		this.ram.write(this.i.read(0), 0b11010101)
		this.ram.write(this.i.read(0) + 1, 0b00111100)
		this.ram.write(this.i.read(0) + 2, 0b11100011)
		this.ram.write(this.pc.address, 0xD0)
		this.ram.write(this.pc.address + 1, 0x13)
		this.ram.write(this.pc.address + 2, 0x00)
		this.ram.write(this.pc.address + 3, 0xE0)
		this.ram.write(this.pc.address + 4, 0x22)
		this.ram.write(this.pc.address + 5, 0x04)
		this.ram.write(this.pc.address + 6, 0x00)
		this.ram.write(this.pc.address + 7, 0xEE)
		this.instructionInterpreter = new Interpreter([
			{
				id: 0x0FFF, mask: 0x0000, execute: instruction => {
				}, description: '0x0NNN - Calls the RCA 1802 program at address NNN.'
			},
			{
				id: 0x00E0, mask: 0xFFFF, execute: instruction => {
					this.screenRef.current!.clear()
				}, description: '0x00E0 - Clears the screen.'
			},
			{
				id: 0x00EE, mask: 0xFFFF, execute: instruction => {
					if (this.stackPointer.address > 0) {
						this.stackPointer.dec()
						this.pc.goTo(this.stack.read(this.stackPointer.address))
					}
				}, description: '0x00EE - Returns from jump to subprogram.'
			},
			{
				id: 0x1000, mask: 0xF000, execute: instruction => {
					this.pc.goTo((instruction & 0xFFF) - 2)
				}, description: '0x1NNN - Jumps to address NNN.'
			},
			{
				id: 0x2000, mask: 0xF000, execute: instruction => {
					this.stack.write(this.stackPointer.address, this.pc.address)
					if (this.stackPointer.address < this.stackPointer.memoryLength - 1) {
						this.stackPointer.inc()
					}
					this.pc.goTo((instruction & 0xFFF) - 2)
				}, description: '0x2NNN - Jumps to subprogram at address NNN.'
			},
			{
				id: 0x3000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0x4000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0x5000, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x6000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0x7000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0x8000, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8001, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8002, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8003, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8004, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8005, mask: 0xF00F, execute: instruction => {
				}, description: '0x8XY5 - V[Y] is subtracted from V[X]. VF is set to 0 when there is a borrow and to 1 when there is none.'
			},
			{
				id: 0x8006, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x8007, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x800E, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0x9000, mask: 0xF00F, execute: instruction => {
				}
			},
			{
				id: 0xA000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0xB000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				id: 0xC000, mask: 0xF000, execute: instruction => {
				}
			},
			{
				//TODO: care for register overflow (const x = this.v[X] + col % 64px is better)
				id: 0xD000, mask: 0xF000, execute: instruction => {
					const X: number = (instruction & 0x0F00) >> 8
					const Y: number = (instruction & 0x00F0) >> 4
					const H: number = (instruction & 0x000F)
					this.v.write(0xF, 0)
					for (let row = 0; row < H; row++) {
						const pixelsEncoding: number = this.ram[this.i.read(0) + row]
						const y: number = (this.v.read(Y) + row) % this.screenRef.current!.props.definition.height
						for (let col = 0; col < 8; col++) {
							const x: number = (this.v.read(X) + col) % this.screenRef.current!.props.definition.width
							if ((pixelsEncoding & (0x1 << (7 - col))) !== 0) {
								if (this.screenRef.current!.getPixelColor({x: x, y: y}) === 'white') {
									this.screenRef.current!.setPixelColor({x: x, y: y}, 'black')
									this.v.write(0xF, 0x1)
								} else {
									this.screenRef.current!.setPixelColor({x: x, y: y}, 'white')
								}
							}
						}
					}
				}, description: '0xDXYN - Draws a sprite with a height of N pixels at coordinates (V[X], V[Y]).'
			},
			{
				id: 0xE09E, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xE0A1, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF007, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF00A, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF015, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF018, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF01E, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF029, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF033, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF055, mask: 0xF0FF, execute: instruction => {
				}
			},
			{
				id: 0xF065, mask: 0xF0FF, execute: instruction => {
				}
			}
		])
	}

	private interpretInstruction(): void {
		const opcode: number = ((this.ram.read(this.pc.address) << 8) + this.ram.read(this.pc.address + 1))
		this.instructionInterpreter.execute(opcode)
		this.pc.inc()
		this.pc.inc()
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<System frequency={1} onUpdate={this.interpretInstruction.bind(this)}>
				<Screen position={{x: 10, y: 10}} definition={{width: 64, height: 32}} pixelsDimensions={{width: 10, height: 10}} refreshFrequency={60} display={true} ref={this.screenRef} />
				<Memory name={'RAM'} memory={this.ram} pointers={[this.pc]} />
				<Memory name={'V'} memory={this.v} pointers={[]} />
				<Memory name={'Stack'} memory={this.stack} pointers={[this.stackPointer]} />
				<Memory name={'I'} memory={this.i} pointers={[]} />
				<Memory name={'GameCounter'} memory={this.gameCounter} pointers={[]} />
				<Memory name={'SoundCounter'} memory={this.soundCounter} pointers={[]} />
			</System>
		)
	}

}