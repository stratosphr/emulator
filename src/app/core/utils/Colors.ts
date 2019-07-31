import Numbers from './Numbers'

export default class Colors {

	public static random(): string {
		return '#' + Numbers.toStringWithBase(Math.floor(Math.random() * 16777215), 16, 6)
	}

}