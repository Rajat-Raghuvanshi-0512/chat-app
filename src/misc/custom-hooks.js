import { useCallback, useState } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});

    const openModal = (props) => {
        setIsOpen(true);
        setModalProps(props);
    }

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [])

    return {
        isOpen,
        openModal,
        closeModal,
        modalProps
    }
}