import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";




export default function Eye({ placeholder = "Ingresar contraseña" }) {  // Agregamos `placeholder` como prop
   
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
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
      className=" w-full text-white focus:outline-none border-b-2 "
    />
  );
}