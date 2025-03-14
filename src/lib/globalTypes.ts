import { Field } from './constants'

export interface IUser {
	id: string
	[Field.firstName]: string
	[Field.lastName]: string
	avatar?: string
}
