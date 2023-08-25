import { expect, it } from "vitest"
import * as index from ".."
import PanelInputTextVue from "../PanelInputText.vue"
import PanelTextareaVue from "../PanelTextarea.vue"

it("PanelInputText", () => {
    expect(index.PanelInputText).toEqual(PanelInputTextVue)
})

it("PanelTextarea", () => {
    expect(index.PanelTextarea).toEqual(PanelTextareaVue)
})