import React, {Component} from 'react'

interface ISystemProps {

	frequency: number
	onUpdate: () => void

}

interface ISystemState {
}

export default class System extends Component<ISystemProps, ISystemState> {

	private static panic(timeStep: number): void {
		console.error('The applyToNode process is too slow to render the game at expected refresh rate (' + Math.round(1000 / timeStep) + ' frames per second)')
	}

	public componentDidMount(): void {
		window.requestAnimationFrame((timestamp) => this.loop(1000 / this.props.frequency, timestamp, 0, 0))
	}

	private loop(timeStep: number, timestamp: number, delta: number, lastFrameTimeMs: number): void {
		delta += timestamp - lastFrameTimeMs
		lastFrameTimeMs = timestamp
		let numUpdateSteps = 0
		while (delta >= timeStep) {
			this.props.onUpdate()
			delta -= timeStep
			if (++numUpdateSteps >= 200) {
				System.panic(timeStep)
				break
			}
		}
		window.requestAnimationFrame((timestamp) => this.loop(timeStep, timestamp, delta, lastFrameTimeMs))
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}

}