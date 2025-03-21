import { Field } from '@/lib/constants'
import { z } from 'zod'

export const ChangeUserSkillSchema = z.object({
	id: z.union([z.string(), z.number()]).optional(),
	[Field.skill]: z.union([z.string(), z.number()]),
	[Field.experience]: z.number(),
	[Field.description]: z.string().optional(),
})
