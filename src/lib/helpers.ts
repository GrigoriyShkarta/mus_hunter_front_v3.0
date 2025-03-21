export const getUkrainianYears = (age: number) => {
	console.log('age', age)
	if (age === 0) return 'меньше року'
	if (age % 10 === 1 && age % 100 !== 11) return 'рік'
	if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100))
		return 'роки'
	return 'років'
}
