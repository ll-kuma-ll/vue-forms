import { expect, it } from "vitest"
import * as index from ".."
import PanelInputTextVue from "../PanelInputText.vue"
import PanelTextareaVue from "../PanelTextarea.vue"
import PanelSelectOptionVue from "../PanelSelectOption.vue"

it("PanelInputText", () => {
    expect(index.PanelInputText).toEqual(PanelInputTextVue)
})

it("PanelTextarea", () => {
    expect(index.PanelTextarea).toEqual(PanelTextareaVue)
})

it("PanelSelectOption", () => {
    expect(index.PanelSelectOption).toEqual(PanelSelectOptionVue)
})