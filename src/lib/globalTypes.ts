import { Field } from './constants'

interface IOption {
	id: number
	name: string
}

export interface ISkill {
	id: number
	skill: IOption
	[Field.experience]: number
	[Field.description]?: string
}

export interface IUser {
	id: string
	[Field.firstName]: string
	[Field.lastName]: string
	[Field.age]?: string
	[Field.city]?: IOption
	[Field.description]?: string
	[Field.links]?: string[]
	[Field.styles]?: IOption[]
	[Field.telephone]?: string
	inSearchBand?: {
		id: number
		[Field.skill]: IOption
		[Field.styles]: IOption[]
		[Field.description]?: string
	}
	inSearchMusician?: {
		id: number
		[Field.skill]: IOption
		[Field.styles]?: IOption[]
		[Field.experience]: number
		[Field.description]?: string
	}[]
	skills?: ISkill[]
	avatar?: string
}

export interface ICommonData {
	cities: IOption[]
	styles: IOption[]
	skills: IOption[]
}
