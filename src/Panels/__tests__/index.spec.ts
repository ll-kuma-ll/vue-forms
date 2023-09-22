import * as index from ".."
import PanelInputCheckVue from "../PanelInputCheck.vue"
import PanelInputTextVue from "../PanelInputText.vue"
import PanelTextareaVue from "../PanelTextarea.vue"
import PanelSelectOptionVue from "../PanelSelectOption.vue"

it("PanelInputCheck", () => {
    expect(index.PanelInputCheck).toEqual(PanelInputCheckVue)
})

it("PanelInputText", () => {
    expect(index.PanelInputText).toEqual(PanelInputTextVue)
})

it("PanelTextarea", () => {
    expect(index.PanelTextarea).toEqual(PanelTextareaVue)
})

it("PanelSelectOption", () => {
    expect(index.PanelSelectOption).toEqual(PanelSelectOptionVue)
})