import { FcSettings } from "react-icons/fc";
import SettingsDialog from "./SettingsDialog";
import { useState } from "react";

export default function Navbar() {

    const [showDialog, setShowDialog] = useState<boolean>(false);

    function handleSettings() {
        setShowDialog(prev => !prev);
    }

    return (
        <div className="flex justify-end items-center px-4 py-1">
            <FcSettings onClick={handleSettings} />

            <SettingsDialog setShowDialog={setShowDialog} showDialog={showDialog} />
        </div>
    )
}