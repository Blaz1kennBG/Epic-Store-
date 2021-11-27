import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: undefined
})
export const gamesState = atom({
    key: "gamesState",
    default: undefined
})
export const originalGamesState = atom({
    key: "originalGamesState",
    default: undefined
})