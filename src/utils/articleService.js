import Backendless from "backendless";
import { toast } from "react-toastify"
import {uploadImage} from './cloudinary'
export async function uploadArticle  (file, title, description, developer) {
    if (!file) { return toast("Please upload image.")}
    const blob = file.slice(0, file.size, 'image/png'); 
    const newFile = new File([blob], Date.now()+".png", {type: file.type})

    uploadImage(newFile)
    .then(fileUrlResponse => {
          Backendless.Data.of("Articles").save({ title: title, description: description, thumbnail: fileUrlResponse, developer: developer}) 
        .then(response => {
            toast("Article uploaded successfuly")
        })
        .catch(e => 
            {
        
            toast(e)
            })  
    })
    .catch(e => 
        {
            toast(e)
        console.log("ERROR >>> ", e)})   
}
