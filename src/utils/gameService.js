import Backendless  from "backendless"
import { toast } from "react-toastify"
import { uploadImage } from "./cloudinary"

export async function uploadGame(title,developer,description,publisher,genres,price,discount,images,gameLogo,thumbnail) {
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
        thumbnail: ''
    }
    console.log(genres)
      let blobbedImages = undefined
    if (images) {
         blobbedImages = images.map(img => {
            const blob = img.slice(0, img.size, 'image/png')
            return new File([blob], Date.now() + ".png", { type: img.type })  
        })
        for (let img of blobbedImages) {
          await  uploadImage(img)
            .then(res => gameObj.imageList.push(res))
            .catch(e => toast(e))
        }}
    if (gameLogo) {
        const temp = gameLogo.slice(0, gameLogo.size, 'image/png')
        const blob = new File([temp], Date.now() + ".png", {type: gameLogo.type})
        await   uploadImage(blob).then(res => gameObj.gameLogo = res)
        .catch(e => toast(e))
    }

    if (thumbnail) {
        const temp = thumbnail.slice(0, thumbnail.size, 'image/png')
        const blob = new File([temp], Date.now() + ".png", {type: thumbnail.type})
        await  uploadImage(blob).then(res => gameObj.thumbnail = res)
        .catch(e => toast(e))
    }

    const response = await Backendless.Data.of("Games").save(gameObj)
    return response
}

