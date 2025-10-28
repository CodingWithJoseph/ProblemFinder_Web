import {AnimatePresence, motion} from "framer-motion";
import {Menu, X} from "lucide-react";

type DropdownButtonProps = {
    isMenuOpen: boolean;
    onToggle: () => void;
};

export function DropdownButton({isMenuOpen, onToggle}: DropdownButtonProps) {
    return <AnimatePresence mode={"wait"}>
        <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={onToggle}>
            {isMenuOpen ? (
              <motion.div
                key="x-icon"
                initial={{rotate: 0, opacity: 0}}
                animate={{rotate: 720, opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4, ease: 'easeInOut'}}>
                <X className="w-6 h-6 text-gray-800" />
              </motion.div>
            ) : (
              <motion.div
                key = 'menu-icon'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}>
                <Menu key="menu-icon" className="w-6 h-6 text-gray-800"/>
              </motion.div>
            )}
        </motion.button>
    </AnimatePresence>
}