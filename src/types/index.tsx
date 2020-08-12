

export interface Component {
    ID: string
    Field: string
    Position: { "x": number, "y": number }
    Size: { "width": number, "height": number }
    Args: ButtonArgs | AppBarArgs
}

export interface ButtonArgs {
    Field: "button"
    Variant: "contained" | "outlined" | "text"
    Text: string
}

export const defaultButtonArgs = () => {
    return { Field: "button", Variant: "contained", Text: "Text" } as ButtonArgs
}

export interface AppBarArgs {
    Field: "appbar"
    Title: string
}

export const defaultAppBarArgs = () => {
    return { Field: "appbar", Title: "title" } as AppBarArgs
}