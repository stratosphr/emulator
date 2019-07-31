import React, {Component} from 'react'
import AMemory from './AMemory'
import '../../css/Memory.css'
import Numbers from '../utils/Numbers'

interface IMemoryProps {

	name: string
	memory: AMemory

}

interface IMemoryState {
}

export default class Memory extends Component<IMemoryProps, IMemoryState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div>
				<table className={'memory'}>
					<caption>{this.props.name}</caption>
					<thead>
					<tr>
						<th rowSpan={2}>Address</th>
						<th colSpan={3}>Data</th>
					</tr>
					<tr>
						<th>Binary</th>
						<th>Hexadecimal</th>
						<th>Decimal</th>
					</tr>
					</thead>
					<tbody>
					{this.props.memory.map((data, address) =>
						<tr key={this.props.name + '_tr_' + address}>
							<td>{address}</td>
							<td>{Numbers.toStringWithBase(this.props.memory.read(address), 2, this.props.memory.dataLength)}</td>
							<td>{Numbers.toStringWithBase(this.props.memory.read(address), 16, this.props.memory.dataLength / 4)}</td>
							<td>{this.props.memory.read(address)}</td>
						</tr>)}
					</tbody>
				</table>
			</div>
		)
	}

}
