export const HonorRoll = `
    coinWallets {
        student {
            user {
                id
                username
                student {
                    currentAvatarHead {
                        id
                        image
                    }
                    currentAvatarAccessories {
                        id
                        image
                    }
                    currentAvatarClothes {
                        id
                        image
                    }
                }
            }
        }
        blockTransactionCoins
    }
`
