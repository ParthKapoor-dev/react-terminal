import { Terminal } from "@xterm/xterm"
import { MutableRefObject, useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";


const terminal = new Terminal();

export default function XtermTerminal() {

  const terminalRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!terminalRef.current) return;

    terminal.open(terminalRef.current);
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  },)

  return (
    <div ref={terminalRef}>
      Xterm
    </div>
  )

}