export const removeDuplicateClients = (clientsArray) => {
  const uniqueIds = []

  const uniqueClientsArray = clientsArray.filter((client) => {
    const isDuplicate = uniqueIds.includes(client.userId)

    if (!isDuplicate) {
      uniqueIds.push(client.userId)
      return true
    }

    return false
  })

  return uniqueClientsArray
}
