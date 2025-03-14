import { Field } from '@/lib/constants'
import { IMainInfoForm } from '../types'
import { ChangeMainUserInfo } from './schema'

export async function changeMainUserInfo(
	prevState: IMainInfoForm,
	formData: FormData
) {
	const rawData: IMainInfoForm = {
		[Field.age]: formData.get(Field.age) as string,
		[Field.links]: formData.getAll(Field.links) as string[],
		[Field.cityId]: formData.get(Field.cityId) as string,
		[Field.description]: formData.get(Field.description) as string,
		[Field.styles]: formData.getAll(Field.styles).map(style => +style),
		[Field.telephone]: formData.get(Field.telephone) as string,
		[Field.firstName]: formData.get(Field.firstName) as string,
		[Field.lastName]: formData.get(Field.lastName) as string,
	}

	const result = ChangeMainUserInfo.safeParse(rawData)

	if (!result.success) {
		return {
			...rawData,
			errors: result.error.flatten().fieldErrors,
		}
	}

	// Возвращаем новый state
	return rawData
}
