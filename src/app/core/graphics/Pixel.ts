import {IPosition} from '../utils/IPosition'

export default class Pixel {

	position: IPosition
	color: string

	constructor(position: IPosition, color: string) {
		this.position = position
		this.color = color
	}

}