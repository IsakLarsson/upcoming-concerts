// %2C between every genre
export const genres = {
    afrobeats: 'afrobeats',
    alternativeAndindie: 'alternative-and-indie',
    artsAndCulture: 'arts-and-culture',
    comedy: 'comedy',
    country: 'country',
    electronic: 'electronic',
    hardRockAndMetal: 'hard-rock-and-metal',
    hipHopAndRap: 'hip-hop-and-rap',
    latin: 'latin',
    other: 'other',
    pop: 'pop',
    reggae: 'reggae',
    rnbAndSoul: 'rnb-and-soul',
    rock: 'rock',
}

export const buildGenreString = (genreList) => {
    let genreString = ''
    for (const genre of genreList) {
        genreString = genreString + genre + '%2C'
    }
    return genreString
}
