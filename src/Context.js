import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AppContext=createContext();
const name="arvind";

const AppProvider=({children})=>{
    return <AppContext.Provider value={name}>
          {children} 
         </AppContext.Provider>;
};


// global function 
const useGlobalcontext = ()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalcontext}