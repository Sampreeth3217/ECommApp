import React from "react";
import {cartContext} from './cartContext'


function cartStore({children})
{
    return(
        <cartContext></cartContext>
    )
}


export default cartContext;