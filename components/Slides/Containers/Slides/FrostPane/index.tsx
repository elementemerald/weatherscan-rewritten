import * as React from "react";

interface FrostPaneProps {
    id?: string
    extraParent?: string[]
    style?: React.CSSProperties
    children: React.ReactNode
}

const FrostPane = ({
    id,
    extraParent,
    style,
    children
}: FrostPaneProps) => (
    <>
        <div
            id={`frost-pane${id ? ` ${id}` : null}`}
            className={`transform translate-y-2.5 text-white font-frutiger text-frost-pane text-shadow max-h-frost-pane bg-frost-pane bg-no-repeat z-frost-pane flex-1 ${extraParent ? extraParent.join(" ") : ""}`}
            style={style}
        >
            {children}
        </div>
    </>
);

export default FrostPane;
