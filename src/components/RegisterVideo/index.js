import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm: () => {
            setValues({});
        }
    }
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastrado = useForm({
        initialValues: { titulo: "title...", url: "http://...." }
    });
    /**
     * TODO
     * [X] Botão para adicionar vídeo
     * [X] Modal
     *   --> [X] Controlar o state
     *   --> [X] Formulário
     *      --> [X] pegar os dados dos inputs
     *      --> [X] submit do formulário
     *      --> [X] limpar os inputs
     */
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário*/}
            {/* Operadores de curto-circuito --> true && "do something" */}
            {formVisivel
                &&
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastrado.values);
                    setFormVisivel(false);
                    formCadastrado.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Título do Vídeo"
                            name="titulo"
                            values={formCadastrado.values.titulo}
                            onChange={formCadastrado.handChange}
                            />
                        <input
                            placeholder="URL"
                            name="url"
                            values={formCadastrado.values.url}
                            onChange={formCadastrado.handChange}
                            /*
                            código inicial:

                            onChange={(evento) => {
                                const value = evento.target.value;
                                setValues({
                                    ...values,
                                    url: value,
                                });
                            }}
                            */
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
                /* Could be:
                    {formVisivel 
                        ?
                        put here the form
                        : 
                        nothing
                
                */
            }


        </StyledRegisterVideo>
    );
}