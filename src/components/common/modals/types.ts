import { Field } from '@/lib/constants'

export interface IMainInfoForm {
	[Field.firstName]: string
	[Field.lastName]: string
	[Field.age]: string
	[Field.links]: string[]
	[Field.cityId]: number | string
	[Field.description]: string
	[Field.styles]: number[]
	[Field.telephone]: string
	errors?: {
		[Field.email]?: string[]
		[Field.password]?: string[]
		[Field.firstName]: string[]
		[Field.lastName]: string[]
		[Field.age]: string[]
		[Field.links]: string[]
		[Field.cityId]: string[]
		[Field.description]: string[]
		[Field.styles]: string[]
		[Field.telephone]: string[]
		responseError?: string
	}
}
