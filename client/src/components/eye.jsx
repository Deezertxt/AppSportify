import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./eyeCerrado";
import {EyeSlashFilledIcon} from "./Eyeabierto";




export default function Eye({ placeholder = "Ingresar contraseña" }) {  // Agregamos `placeholder` como prop
   
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);


  
  return (
    <Input
      
      variant=" "
      placeholder={placeholder}
      endContent={
        <button className=" " type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
          {isVisible ? (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none text-white " />
          ) : (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none text-white" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className=" w-full text-white"
    />
  );
}