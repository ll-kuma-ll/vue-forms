import * as index from ".."
import PanelCancelSubmitVue from "../PanelCancelSubmit.vue"
import PanelInputCheckVue from "../PanelInputCheck.vue"
import PanelInputTextVue from "../PanelInputText.vue"
import PanelTextareaVue from "../PanelTextarea.vue"
import PanelSelectOptionVue from "../PanelSelectOption.vue"

it("PanelCancelSubmit", () => {
    expect(index.PanelCancelSubmit).toEqual(PanelCancelSubmitVue)
})

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