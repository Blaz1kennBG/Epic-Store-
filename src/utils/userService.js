import Backendless from "backendless";
export async function registerUser(user) {
    let responseUser = ''
    const registeredUser = await Backendless.UserService.register(user)
    const tempUser = new Backendless.User()
    tempUser.objectId = registeredUser.objectId
    tempUser.gamesBought = []
    tempUser.wishlist = []

  await Backendless.UserService.update(tempUser).then(updatedUser => {
      console.log(updatedUser)
        responseUser = updatedUser
    })
        .catch(e => {
            return e
        })
    return responseUser
}
export async function loginUser(username, password) {
   await  Backendless.UserService.login(username, password, true).then().catch(e => e)
}