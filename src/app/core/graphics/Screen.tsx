import React, {Component, RefObject} from 'react'
import {IDimensions} from '../utils/IDimensions'
import {IPosition} from '../utils/IPosition'
import Pixel from './Pixel'

interface IScreenProps {

	position?: IPosition
	definition: IDimensions
	pixelsDimensions: IDimensions

}

interface IScreenState {
}

export default class Screen extends Component<IScreenProps, IScreenState> {

	private readonly dimensions: IDimensions
	private readonly position: IPosition
	private readonly pixels: Pixel[][]
	private readonly canvasRef: RefObject<HTMLCanvasElement>
	private ctx: CanvasRenderingContext2D | null

	constructor(props: Readonly<IScreenProps>) {
		super(props)
		this.canvasRef = React.createRef<HTMLCanvasElement>()
		this.dimensions = {width: this.props.definition.width * this.props.pixelsDimensions.width, height: this.props.definition.height * this.props.pixelsDimensions.height}
		this.position = this.props.position === undefined ? {x: 0, y: 0} : this.props.position
		this.pixels = []
		this.ctx = null
		this.initPixels()
	}

	public componentDidMount(): void {
		this.ctx = this.canvasRef.current!.getContext('2d')
		this.clear()
	}

	public clear(color: string = 'black'): void {
		this.clearPixels(color)
		this.ctx!.fillStyle = color
		this.ctx!.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
	}

	public randomizePixelsColors() {
		for (let x = 0; x < this.props.definition.width; x++) {
			for (let y = 0; y < this.props.definition.height; y++) {
				this.setPixelColor({x: x, y: y}, 'rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')')
			}
		}
	}

	public setPixelColor(position: IPosition, color: string) {
		this.pixels[position.x][position.y].color = color
		this.ctx!.beginPath()
		this.ctx!.fillStyle = this.pixels[position.x][position.y].color
		this.ctx!.fillRect(this.pixels[position.x][position.y].position.x, this.pixels[position.x][position.y].position.y, this.props.pixelsDimensions.width, this.props.pixelsDimensions.height)
	}

	private initPixels(): void {
		for (let x = 0; x < this.props.definition.width; x++) {
			this.pixels[x] = []
			for (let y = 0; y < this.props.definition.height; y++) {
				this.pixels[x][y] = new Pixel({x: x * this.props.pixelsDimensions.width, y: y * this.props.pixelsDimensions.height}, 'black')
			}
		}
	}

	private clearPixels(color: string = 'black') {
		for (let x = 0; x < this.props.definition.width; x++) {
			for (let y = 0; y < this.props.definition.height; y++) {
				this.pixels[x][y].color = color
			}
		}
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas width={this.dimensions.width} height={this.dimensions.height} ref={this.canvasRef} style={{position: 'relative', left: this.position.x, top: this.position.y}}>
				Unable to emulate screen because the canvas element isn't supported by your browser.
			</canvas>
		)
	}

}