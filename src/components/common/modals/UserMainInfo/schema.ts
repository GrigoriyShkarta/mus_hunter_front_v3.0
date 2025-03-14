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
	[Field.age]: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: 'Дата должна быть в формате YYYY-MM-DD',
		})
		.optional(),
	[Field.links]: z
		.array(z.string().url({ message: 'Некорректный URL' }))
		.optional(),
	[Field.cityId]: z.number().optional(),
	[Field.description]: z.string().optional(),
	[Field.styles]: z.array(z.string()).optional(),
	[Field.telephone]: z.string().optional(),
})
