import { Dialog } from "@headlessui/react";

const Modal = (props) => {

    const { openState, title, description } = props;
    const [isOpen, setIsOpen] = openState;

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} className="z-10 fixed inset-0 flex items-center justify-center">
        <Dialog.Overlay className="absolute inset-0 bg-black opacity-20 -z-10" />
            <div className="relative w-1/2 p-2 rounded-xl shadow-md bg-white p-4">
                <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
                <Dialog.Description className="pt-1 text-gray-600">
                    {description}
                </Dialog.Description>
                {props.children}
            </div>
        </Dialog>
    )
}

export default Modal;