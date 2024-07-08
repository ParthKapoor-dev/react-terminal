import { FcSettings } from "react-icons/fc";
import { TbMessageChatbot } from "react-icons/tb";
import SettingsDialog from "./SettingsDialog";
import { useState } from "react";

interface NavbarProps{
    handleAddChatbot : ()=>void
}
export default function Navbar({ handleAddChatbot} : NavbarProps ) {

    const [showDialog, setShowDialog] = useState<boolean>(false);

    function handleSettings() {
        setShowDialog(prev => !prev);
    }

    return (
        <div className="flex justify-end items-center px-4 py-1 gap-4">

            <TbMessageChatbot color="white" onClick={handleAddChatbot} />

            <FcSettings onClick={handleSettings} />

            <SettingsDialog setShowDialog={setShowDialog} showDialog={showDialog} />
        </div>
    )
}