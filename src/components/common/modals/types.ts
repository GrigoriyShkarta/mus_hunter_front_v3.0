import { Field } from '@/lib/constants'

export interface IMainInfoForm {
	[Field.firstName]: string
	[Field.lastName]: string
	[Field.age]?: string
	[Field.links]?: string[]
	[Field.city]?: number | string
	[Field.description]?: string
	[Field.styles]?: number[]
	[Field.telephone]?: string
}

export interface ISkillsForm {
	id?: number | string
	[Field.skill]: number | string
	[Field.experience]: number
	[Field.description]?: string
}

export interface IUserSearchBand {
	id?: number | string
	[Field.skill]: number | string
	[Field.styles]: number[]
	[Field.description]?: string
}

export interface ISearchMusician {
	id?: number | string
	[Field.skill]: number | string
	[Field.experience]: number
	[Field.styles]: number[]
	[Field.description]?: string
}
