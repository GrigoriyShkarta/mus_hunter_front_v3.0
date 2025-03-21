export enum Field {
	email = 'email',
	password = 'password',
	repeatPassword = 'repeatPassword',
	firstName = 'firstName',
	lastName = 'lastName',
	age = 'age',
	telephone = 'telephone',
	links = 'links',
	city = 'city',
	description = 'description',
	styles = 'styles',
	skill = 'skill',
	experience = 'experience',
}

export enum ModalType {
	UserMain,
	UserSkills,
	UserInSearchBand,
	InSearchMusician,
}

export enum Language {
	UA = 'ua',
	EN = 'en',
}

export const StorageToken = 'musToken'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}
