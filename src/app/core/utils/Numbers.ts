import {EDataLength} from '../memory/EDataLength'

export default class Numbers {

	public static toStringWithBase(value: number, base: number, length: EDataLength = EDataLength.BYTE): string {
		return Numbers.pad(value.toString(base), length).toUpperCase()
	}

	private static pad(strValue: string, length: EDataLength): string {
		return '0'.repeat(length - strValue.length) + strValue
	}

}
