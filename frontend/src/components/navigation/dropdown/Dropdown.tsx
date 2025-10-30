import {motion} from "framer-motion";
import {RefObject, useRef} from "react";
import {DropdownButton} from "./DropdownButton";
import {DropdownMenu} from "./DropdownMenu";
import {NavigationProps } from "../NavigationProps";
import { useClickOutside } from "@/hooks/UseClickOutside";



export function Dropdown({ navProps } : { navProps: NavigationProps }) {
    const menuRef: RefObject<HTMLElement> = useRef(null!);
    useClickOutside({menuRef, isMenuOpen: navProps.isMenuOpen, onCloseMenu: navProps.onCloseMenu });

    return (
        <motion.nav ref={menuRef}>
            <DropdownButton navProps={navProps} />
            <DropdownMenu navProps={navProps} />
        </motion.nav>
    );
}
