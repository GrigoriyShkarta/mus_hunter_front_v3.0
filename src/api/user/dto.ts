import { Field } from '@/lib/constants'

export interface ICheckEmail {
	id: string
	[Field.email]: string
	[Field.firstName]: string
	[Field.lastName]: string
	avatarUrl?: string
}
