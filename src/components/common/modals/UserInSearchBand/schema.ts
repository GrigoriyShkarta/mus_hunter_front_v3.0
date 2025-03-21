import { Field } from '@/lib/constants'
import { z } from 'zod'

export const ChangeUserSearchBand = z.object({
	id: z.union([z.string(), z.number()]).optional(),
	[Field.skill]: z.union([z.string(), z.number()]),
	[Field.styles]: z.array(z.number()),
	[Field.description]: z.string().optional(),
})
