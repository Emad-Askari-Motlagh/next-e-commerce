function CapitaliseFirstLetter(text) {
  const firstLetter = text.charAt(0).toUpperCase()
  const newName = text.replace(text.charAt(0), firstLetter)
  return newName
}

export { CapitaliseFirstLetter }
