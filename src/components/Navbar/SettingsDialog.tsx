import { useTheme } from "../../Providers/ThemeProvider";
import { cn } from "../../utils/cn"


interface DialogProps {
    showDialog: boolean,
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SettingsDialog({ showDialog, setShowDialog }: DialogProps) {

    const { theme, setTheme } = useTheme();

    function handleClose() {
        setShowDialog(false);
    }

    function handleTheme() {
        if (theme == 'light')
            setTheme('dark');
        else
            setTheme('light');
    }

    return (
        <div className={cn("absolute z-10 top-0 left-0 backdrop-blur-sm h-screen w-screen  justify-center items-center", showDialog == true ? "flex" : "hidden")}>
            <div className="bg-white flex flex-col py-2 px-4 shadow-lg">
                <button onClick={handleClose}>
                    Close
                </button>
                <p className="font-semibold text-lg">
                    Settings Dialog
                </p>

                <div>

                    <div>
                        Current Theme is {theme}
                    </div>

                    <button className="bg-black text-white" onClick={handleTheme} >
                        Change Theme to {theme == 'light' ? "Dark" : "Light"}
                    </button>

                </div>


            </div>
        </div>
    )
}