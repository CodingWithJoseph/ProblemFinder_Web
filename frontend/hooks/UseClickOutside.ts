import {RefObject, useEffect} from "react";


type UseClickOutsideProps = {
    menuRef: RefObject<HTMLElement>;
    isMenuOpen: boolean;
    onCloseMenu: () => void;
}

export function useClickOutside( {menuRef, isMenuOpen, onCloseMenu}: UseClickOutsideProps) {
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onCloseMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleMouseDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [isMenuOpen, menuRef, onCloseMenu]);
}