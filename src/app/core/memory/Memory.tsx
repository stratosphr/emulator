import React, {Component} from 'react'
import AMemory from './AMemory'
import Binary from '../utils/Binary'
import '../../css/Memory.css'

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
				<table>
					<caption>{this.props.name}</caption>
					<thead>
					<tr>
						<th rowSpan={2}>Address</th>
						<th colSpan={this.props.memory.dataLength + 1}>Data</th>
					</tr>
					<tr>
						<th colSpan={this.props.memory.dataLength}>Binary</th>
						<th>Decimal</th>
					</tr>
					</thead>
					<tbody>
					{this.props.memory.map((data, address) => <tr key={this.props.name + '_tr_' + address}>{[<td key={this.props.name + '_address_' + address}>{address}</td>, ...Binary.toString(data, this.props.memory.dataLength).split('').map((bit, bitIndex) =>
						<td key={this.props.name + '_data_' + address + '_bit_' + bitIndex}>{bit}</td>), <td key={this.props.name + '_data_' + address}>{data}</td>]}</tr>)}
					</tbody>
				</table>
			</div>
		)
	}

}
