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
            <div className="bg-white dark:bg-neutral-900 flex flex-col py-2 px-4 shadow-lg w-[30rem] h-[20rem] rounded border-2 border-slate-600 ">
                <button onClick={handleClose} className="flex justify-end">
                    Close
                </button>
                <p className="font-semibold text-lg">
                    Settings
                </p>

                <div className="flex gap-2 items-center">

                    <div>
                        Current Theme is {theme}
                    </div>

                    <button className="bg-black p-2 rounded border-2 border-slate-600 hover:bg-slate-300 hover:text-black text-white duration-200" onClick={handleTheme} >
                        {theme == 'light' ? "Dark" : "Light"} Mode
                    </button>

                </div>


            </div>
        </div>
    )
}