import React, {useEffect} from "react";
import { useState } from "react";
import Modal from 'react-modal'

const NextLevel = ({next, shuffleCards}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(next === 2){
            setOpen(true)
        } else if (next === 6) {
            setOpen(true)
        } else if(next === 14){
            setOpen(true)
        }
       
    }, [next]
    )
    return(
        <Modal className='modal' isOpen={open}>
            <h2>Well Done !!!</h2>
            <button  onClick={() => (setOpen(false), shuffleCards())}>Next Level</button>
        </Modal>
    )

}

export default NextLevel;