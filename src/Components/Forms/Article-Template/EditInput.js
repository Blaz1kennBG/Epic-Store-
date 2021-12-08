import { useEffect, useState } from "react";

const InputEdit = ({editHandler, value: defaultInputValue, type}) => {
   
const [value, setValue] = useState('')
useEffect(() => {
    setValue(defaultInputValue)
}, [])
    return (
        <>
        <textarea
            style={{
                height: "50px",
                color: "white",
                backgroundColor: "rgb(18, 18, 18)",
                width: "100%",
            }}
            defaultValue={defaultInputValue}
            onChange={(ev) => {
                if (ev.target.value.length === 0)  return  setValue(defaultInputValue)
                return setValue(ev.target.value)
                
                   
            }}
            />
            <button style={{
                color: "white",
                backgroundColor: "rgb(18, 18, 18)",
            }}
            onClick={() => {
               
              
                editHandler(value, type)
                }}>Save</button> 
            </>
    );
   
}

export default InputEdit;