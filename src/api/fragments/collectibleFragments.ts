export const COLLECTIBLE_CATEGORY = `
  id
  name
  price
  owned
  firebaseName
`
export const COLLECTIBLE_OWNED_CARD = `
  id
  image
  tire
`

export const CARD = `
  id
  name
  tier
  description {
    key
    value
  }
  category {
    id
    name
    firebaseName
  }
  owned
  amount
  image
`
