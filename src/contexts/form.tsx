import React, { createContext, useState } from "react";

interface FormContextProps {
    formHab: boolean;
    formExp: boolean;
    modificaEstadoExperiencia(): void;
    modificaEstadoHabilidade(): void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

export const FormProvider: React.FC = ({children}) => {
    const [formHab, setFormHab] = useState(true);
    const [formExp, setFormExp] = useState(true);

    function modificaEstadoHabilidade() {
        formHab ? setFormHab(false) : setFormHab(true);
    }

    function modificaEstadoExperiencia() {
        formExp ? setFormExp(false) : setFormExp(true);
    }

    return (
        <FormContext.Provider value={{formHab: formHab, formExp: formExp, modificaEstadoExperiencia, modificaEstadoHabilidade}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;