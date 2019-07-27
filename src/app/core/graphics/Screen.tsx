import React, {Component, RefObject} from 'react'
import {IDimensions} from '../utils/IDimensions'
import {IPosition} from '../utils/IPosition'

interface IScreenProps {

	position?: IPosition
	definition: IDimensions
	pixelsDimensions: IDimensions

}

interface IScreenState {
}

export default class Screen extends Component<IScreenProps, IScreenState> {

	private readonly canvasRef: RefObject<HTMLCanvasElement>
	private ctx: CanvasRenderingContext2D | null
	private dimensions: IDimensions
	private position: IPosition

	constructor(props: Readonly<IScreenProps>) {
		super(props)
		this.canvasRef = React.createRef<HTMLCanvasElement>()
		this.dimensions = {width: this.props.definition.width * this.props.pixelsDimensions.width, height: this.props.definition.height * this.props.pixelsDimensions.height}
		this.position = this.props.position === undefined ? {x: 0, y: 0} : this.props.position
		this.ctx = null
	}

	public componentDidMount(): void {
		this.ctx = this.canvasRef.current!.getContext('2d')
		this.ctx!.translate(0.5, 0.5)
		this.clear()
	}

	public clear(red: number = 0, green: number = 0, blue: number = 0): void {
		this.ctx!.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')'
		this.ctx!.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas width={this.dimensions.width} height={this.dimensions.height} ref={this.canvasRef} style={{position: 'relative', left: this.position.x, top: this.position.y}}>
				Unable to emulate screen because the canvas element isn't supported by your browser.
			</canvas>
		)
	}

}