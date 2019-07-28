import React, {Component} from 'react'

interface ISystemProps {
}

interface ISystemState {
}

export default class System extends Component<ISystemProps, ISystemState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}

}