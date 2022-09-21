import React, { createContext, useState } from 'react'


export const Context = createContext({
    isModalVisible: false,
    changeModalState: () => {}
});

export const ContextProvider = (props: any) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    function changeModalState() {
        setModalVisible(!isModalVisible);
    }
    
    return (
        <Context.Provider
            value={{isModalVisible, changeModalState}}
        >
        {props.children}
        </Context.Provider>
    )
    }