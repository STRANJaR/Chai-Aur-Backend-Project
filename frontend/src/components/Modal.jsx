import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

const Modal = ({ trigger, title, btnContent, mainComponent, handleFunction, children }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    {trigger}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='py-3'>{title}</DialogTitle>
                        <DialogDescription>
                            {children}
                            {/* <Button onClick={handleFunction} className='w-full my-3'>{btnContent}</Button> */}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Modal