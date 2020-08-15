import uid from "uid"



export class User {
    ID: string
    Apps: { [id: string]: App }

    constructor() {
        this.ID = uid()
        this.Apps = {}
    }
}

export class App {
    ID: string
    Title: string
    Description: string
    Pages: { [id: string]: Page }

    constructor() {
        const page: Page = new Page()
        this.ID = uid()
        this.Title = "Untitled"
        this.Description = "No Description"
        this.Pages = {}
        this.Pages[page.ID] = page
    }
}

export class Page {
    ID: string
    Num: number
    Components: { [id: string]: Component }

    constructor() {
        this.ID = uid()
        this.Num = 0
        this.Components = {}
    }
}
// Components

export class Component {
    ID: string
    Position: { "x": number, "y": number }
    Size: { "width": number, "height": number }
    Args: ArgsType

    constructor() {
        this.ID = uid()
        this.Position = { "x": 0, "y": 0 }
        this.Size = { "width": 300, "height": 60 }
        this.Args = new ButtonArgs()
    }

    set(position: { "x": number, "y": number }, size: { "width": number, "height": number }, args: ArgsType) {
        this.Position = position
        this.Size = size
        this.Args = args
    }

    json() {
        return {
            "id": this.ID,
            "position": this.Position,
            "size": this.Size,
            "args": this.Args.json(),
        }
    }

    setPosition(position: { "x": number, "y": number }) {
        this.Position = position
    }
    setSize(size: { "width": number, "height": number }) {
        this.Size = size
    }
    setArgs(args: ArgsType) {
        this.Args = args
    }
}


export type ArgsType = ButtonArgs | AppBarArgs | TypographyArgs | TextFieldArgs | DrawerArgs | PaperArgs

export class ButtonArgs {
    Field: "button"
    Variant: "contained" | "outlined" | "text"
    Text: string

    constructor() {
        this.Field = "button"
        this.Variant = "contained"
        this.Text = "text"
    }

    set(variant: "contained" | "outlined" | "text", text: string) {
        this.Variant = variant
        this.Text = text
    }

    json() {
        return {
            "field": this.Field,
            "variant": this.Variant,
            "text": this.Text,
        }
    }
    setText(text: string) {
        this.Text = text
    }
    setVariant(variant: "contained" | "outlined" | "text") {
        this.Variant = variant
    }
}


export class AppBarArgs {
    Field: "appbar"
    Title: string

    constructor() {
        this.Field = "appbar"
        this.Title = "title"
    }

    set(title: string) {
        this.Title = title
    }

    json() {
        return {
            "field": this.Field,
            "title": this.Title,
        }
    }
    setTitle(title: string) {
        this.Title = title
    }
}


export class TypographyArgs {
    Field: "typography"
    Text: string

    constructor() {
        this.Field = "typography"
        this.Text = "text"
    }

    set(text: string) {
        this.Text = text
    }

    json() {
        return {
            "field": this.Field,
            "text": this.Text,
        }
    }

    setText(text: string) {
        this.Text = text
    }
}

export class TextFieldArgs {
    Field: "textfield"
    Text: string
    constructor() {
        this.Field = "textfield"
        this.Text = "text"
    }

    set(text: string) {
        this.Text = text
    }

    json() {
        return {
            "field": this.Field,
            "text": this.Text,
        }
    }
    setText(text: string) {
        this.Text = text
    }
}

export class DrawerArgs {
    Field: "drawer"
    Text: string
    constructor() {
        this.Field = "drawer"
        this.Text = "text"
    }

    set(text: string) {
        this.Text = text
    }

    json() {
        return {
            "field": this.Field,
            "text": this.Text,
        }
    }
    setText(text: string) {
        this.Text = text
    }
}

export class PaperArgs {
    Field: "paper"
    Text: string
    constructor() {
        this.Field = "paper"
        this.Text = "text"
    }

    set(text: string) {
        this.Text = text
    }

    json() {
        return {
            "field": this.Field,
            "text": this.Text,
        }
    }
    setText(text: string) {
        this.Text = text
    }
}

