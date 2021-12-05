import React, { createContext, useState } from "react";

interface FormContextProps {
    formHab: boolean;
    formExp: boolean;
    listaGestor: boolean;
    modificaListaGestor(): void;
    modificaEstadoExperiencia(): void;
    modificaEstadoHabilidade(): void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

export const FormProvider: React.FC = ({children}) => {
    const [formHab, setFormHab] = useState(true);
    const [formExp, setFormExp] = useState(true);
    const [listaGestor, setListaGestor] = useState(true);

    function modificaEstadoHabilidade() {
        formHab ? setFormHab(false) : setFormHab(true);
    }

    function modificaEstadoExperiencia() {
        formExp ? setFormExp(false) : setFormExp(true);
    }

    function modificaListaGestor() {
        listaGestor ? setListaGestor(false) : setListaGestor(true);
    }

    return (
        <FormContext.Provider 
            value={{
                formHab: formHab, 
                formExp: formExp, 
                listaGestor: listaGestor,
                modificaListaGestor,
                modificaEstadoExperiencia, 
                modificaEstadoHabilidade
            }}
        >
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;