
export const BANK_MOVEMENT = `
    id
    identifier
    randomSlug
    createTimestamp
    updateTimestamp
    date
    side
    comment
    amount
`

export const BANK_WALLET = `
    id
    identifier
    randomSlug
    createTimestamp
    updateTimestamp
    name
    positiveSide
    balance
    bankmovementSet {
        ${BANK_MOVEMENT}
    }
`
