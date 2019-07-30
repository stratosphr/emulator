import {EDataLength} from '../memory/EDataLength'

export default class Binary {

	public static toString(value: number, length: EDataLength = EDataLength.BYTE): string {
		return Binary.pad(value.toString(2), length)
	}

	private static pad(strValue: string, length: EDataLength): string {
		return '0'.repeat(length - strValue.length) + strValue
	}

}
