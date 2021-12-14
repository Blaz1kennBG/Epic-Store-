import Backendless from "backendless";
export async function registerUser(user) {
    let responseUser = ''
    user.gamesBought = []
    user.wishlist = []
    user.cart = []
   
    const registeredUser = await Backendless.UserService.register(user)
    return registeredUser
}
export async function loginUser(username, password) {
   return await Backendless.UserService.login(username, password, true).then().catch(e => e)
}