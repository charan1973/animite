import axios from "axios"
const JIKAN = "https://api.jikan.moe/v3"

export const getTop = () => {
    return axios.get(`${JIKAN}/top/anime`)
            .catch(err => console.log(err))
}

export const getQueried = (query) => {
    return axios.get(`${JIKAN}/search/anime?q=${query}`)
            .catch(err => console.log(err))
}

export const getAnimeInfo = (animeId) => {
    return axios.get(`${JIKAN}/anime/${animeId}`)
            .catch(err => console.log(err))
}

export const getCharacters = (animeId) => {
    return axios.get(`${JIKAN}/anime/${animeId}/characters_staff`)
            .catch(err => console.log(err))
}