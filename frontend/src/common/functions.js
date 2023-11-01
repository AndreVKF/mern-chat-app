export const capitalizeText = (text) => {
  const words = text.split(' ')

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
}

export const removeDuplicateObjects = (objectArray, fieldName) => {
  const cleanObjectArray = []

  objectArray.forEach((element) => {
    const isDuplicated = cleanObjectArray.find(
      (obj) => element[fieldName] === obj[fieldName],
    )

    if (!isDuplicated) {
      cleanObjectArray.push(element)
    }
  })

  return cleanObjectArray
}
