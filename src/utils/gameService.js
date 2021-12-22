import Backendless  from "backendless"
import { uploadImage } from "./cloudinary"

export async function uploadGame(title,developer,description,publisher,genres,price,discount,images,gameLogo,thumbnail, isDiscounted) {
    const gameObj = {
        title: title,
        developer: developer,
        description: description,
        publisher: publisher,
        genres: genres,
        price: price,
        discount: discount,
        imageList: [],
        gameLogo: '',
        thumbnail: '',
        isDiscounted: isDiscounted
    }
      let blobbedImages = undefined
    if (images) {
         blobbedImages = images.map(img => {
            const blob = img.slice(0, img.size, 'image/png')
            return new File([blob], Date.now() + ".png", { type: img.type })  
        })
        for (let img of blobbedImages) {
          await  uploadImage(img)
            .then(res => gameObj.imageList.push(res))
            .catch(e => e)
        }}
    if (gameLogo) {
        const temp = gameLogo.slice(0, gameLogo.size, 'image/png')
        const blob = new File([temp], Date.now() + ".png", {type: gameLogo.type})
        await   uploadImage(blob).then(res => gameObj.gameLogo = res)
        .catch(e => e)
    }

    if (thumbnail) {
        const temp = thumbnail.slice(0, thumbnail.size, 'image/png')
        const blob = new File([temp], Date.now() + ".png", {type: thumbnail.type})
        await  uploadImage(blob).then(res => gameObj.thumbnail = res)
        .catch(e => e )
    }

    const response = await Backendless.Data.of("Games").save(gameObj)
    return response
}

export async function buyGamesInCart(user, cart) {
    const updatedUser = new Backendless.User()
    updatedUser.objectId = user.objectId
    updatedUser.gamesBought = [...user.gamesBought]
    for (let game of cart) {

        updatedUser.gamesBought.push(game)
    }
  const response = await Backendless.UserService.update(updatedUser)
  await emptyCart(user)
  return response

    
}


export async function addToCart(game, user) {
    await Backendless.Data.of("Users").addRelation(
        user, 
        "carts",
        [game]
    )
    return await loadCart(user)
   
}
export async function loadCart(user) {
    const loadRelationQueryBuilder = Backendless.LoadRelationsQueryBuilder.create()
    loadRelationQueryBuilder.setRelationName( "carts" )
   const cart = await Backendless.Data.of("Users").loadRelations(user.objectId, loadRelationQueryBuilder)
   return cart
    
}
export async function removeItemFromCart(user,game) {
   
await Backendless.Data.of("Users").deleteRelation(
    user,
    "carts",
    [game]
)
return await loadCart(user)
}

export async function emptyCart(user) {
    const cart = await loadCart(user)
    await Backendless.Data.of("Users").deleteRelation(
        user,
        "carts",
        cart
    ) 
    return loadCart(user)
}

