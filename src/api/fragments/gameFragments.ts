export const PLAY_GAME_TRANSACTION = `
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

export const GAME = `
    id
    randomSlug
    image
    cost
    playStats
    name
    path
`

export const GAME_CATEGORY = `
    id
    identifier
    randomSlug
    createTimestamp
    updateTimestamp
    image
    bgColor
    name
    gameSet {
        ${GAME}
    }
`
