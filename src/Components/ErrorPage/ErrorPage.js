import { Icon } from "@iconify/react"

const ErrorPage = () => {

return (
    <div style={{marginTop: "40px", marginLeft:"auto", marginRight:"auto"}}>
        <Icon icon="bi:emoji-dizzy" 
        style={{fontSize: "450px", color: "white"}}
        />
        <h1 
        style={{fontSize: "90px", margin: "40px -50px", textAlign: "center", color: "white"}}
        >Page not found.</h1>
    </div>
)
}
export default ErrorPage