import React from "react";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";

export default function video() {
    const contexto = React.useContext(ColorModeContext);
    return (
        <div>
            Video!
            <br/>
            <button onClick={() => contexto.toggleMode()}>
                Trocar Cor
            </button>
        </div>
    )
}