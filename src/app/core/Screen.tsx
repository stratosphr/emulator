import React, {Component} from 'react'

interface IScreenProps {
	width: number
	height: number
	style?: any
}

interface IScreenState {
}

export default class Screen extends Component<IScreenProps, IScreenState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas width={this.props.width} height={this.props.height} style={this.props.style} />
		)
	}

}