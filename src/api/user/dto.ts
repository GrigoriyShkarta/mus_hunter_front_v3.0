import { Field } from '@/lib/constants'

export interface ICheckEmail {
	[Field.email]: string
	[Field.firstName]: string
	[Field.lastName]: string
}
