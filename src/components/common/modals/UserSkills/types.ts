import { Field } from '@/lib/constants'

export interface IUserSkillChanges {
	id: number | string
	skillId: number
	[Field.experience]: number
	[Field.description]?: string
}
