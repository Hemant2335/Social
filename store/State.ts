import { atom } from "recoil"

export const issignin = atom({
    key : "issignin",
    default : false
})

export const Signinpopup = atom({
    key : "signinpopup",
    default : false
})

export const Createpostpopup = atom({
    key : "createpostpopup",
    default : false

})

export const Username = atom({
    key : "username",
    default : ""
})

export const UserId = atom({
    key : "userid",
    default : ""
})

export const PostsType = atom({
    key : "poststype",
    default : 0
})