import React, {Component} from 'react'
import './css/Emulator.css'
import Screen from './core/Screen'

interface IEmulatorProps {
}

interface IEmulatorState {
}

export default class Emulator extends Component<IEmulatorProps, IEmulatorState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Screen width={640} height={320} style={{backgroundColor: 'black', marginTop: '50px', marginLeft: '50px'}} />
		)
	}

}