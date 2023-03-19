export const gamePointCalculator = (player, opponent) => {
    switch (player + opponent) {
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            return 0
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            return -1
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            return 1
    }
}

export const generateGameId = () => {
    const random = Math.random().toString(32).substring(2)
    const date = Date.now().toString(32)
    const id = random + date
    return id
}