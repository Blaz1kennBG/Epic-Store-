
import axios from "axios"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfhuhlxvw/image/upload/"
const CLOUDINARY_UPLOAD_PRESET = "ois7mfmq"


export async function uploadImage (image) {
 
    const formData = new FormData()
    formData.append('file', image)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
    const response = await axios({
        url: CLOUDINARY_URL,
        method: "POST",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",

        },
        data: formData
    })
    
    return response.data.url
}
