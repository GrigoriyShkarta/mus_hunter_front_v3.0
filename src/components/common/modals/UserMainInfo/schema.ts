import { Field } from '@/lib/constants'
import { z } from 'zod'

export const ChangeMainUserInfo = z.object({
	[Field.firstName]: z
		.string()
		.regex(/[a-zA-Zа-яА-Я]/, 'validation.symbolContain')
		.regex(/^[^\s]+$/, 'validation.noSpaceField'),
	[Field.lastName]: z
		.string()
		.regex(/[a-zA-Zа-яА-Я]/, 'validation.symbolContain')
		.regex(/^[^\s]+$/, 'validation.noSpaceField'),
	[Field.age]: z.string().optional(),
	[Field.links]: z
		.array(z.string().url({ message: 'Некорректный URL' }))
		.optional(),
	[Field.city]: z.union([z.string(), z.number()]).optional(),
	[Field.description]: z.string().optional(),
	[Field.styles]: z.array(z.number()).optional(),
	[Field.telephone]: z.string().optional(),
})
