import {motion} from "framer-motion";
import {RefObject, useRef} from "react";
import {DropdownButton} from "./DropdownButton";
import {DropdownMenu} from "./DropdownMenu";
import {useClickOutside} from "../../../hooks/UseClickOutside";
import {NavigationControls} from "../NavigationControls";


export function Dropdown({ navControls } : { navControls: NavigationControls }) {

    const menuRef: RefObject<HTMLElement> = useRef(null!);
    useClickOutside({menuRef, isMenuOpen: navControls.isMenuOpen, onCloseMenu: navControls.onCloseMenu });
    return (
        <motion.nav ref={menuRef}>
            <DropdownButton isMenuOpen={navControls.isMenuOpen} onToggle={navControls.toggleMenu}/>
            <DropdownMenu isMenuOpen={navControls.isMenuOpen}/>
        </motion.nav>
    );
}
