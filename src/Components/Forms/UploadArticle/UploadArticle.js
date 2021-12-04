import Backendless from "backendless";
import {useState } from "react";
import { toast } from "react-toastify";
import style from "./UploadArticle.module.css"

const UploadArticle = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const notify = (text) => toast(text)
    const submitHandler = (ev) => {
        
        ev.preventDefault()
        const blob = file.slice(0, file.size, 'image/png'); 
        const newFile = new File([blob], Date.now()+".png", {type: file.type})

          Backendless.Files.upload(newFile, "articlethumbnails")
        .then(fileUrlResponse => {
            console.log(fileUrlResponse.fileURL)
              Backendless.Data.of("Articles").save({ title: title, description: description, thumbnail: fileUrlResponse.fileURL}) 
            .then(response => {
                console.log(response)
            })
            .catch(e => 
                {
                console.log(e)
                notify(e)
                })  
            notify("Article uploaded successfuly")
        })
        .catch(e => 
            {
            notify(e)
            console.log("ERROR >>> ", e)})  
    }
    return ( 
            <form className={style["box"]} onSubmit={submitHandler}>
                <h1>Upload a new article</h1>
                <input type="text" name="title" placeholder="Title"  onChange={(ev) => setTitle(ev.target.value)} required/>
                <input type="text" name="description" placeholder="Description" onChange={(ev) => setDescription(ev.target.value)} required/>
                <input type="file" name="thumbnail" placeholder="Upload a thumbnail" onChange={(ev) => setFile(ev.target.files[0])} required/>
                <input type="submit" name="file" value="Upload" required/>
            </form>
      );
}
 
export default UploadArticle;