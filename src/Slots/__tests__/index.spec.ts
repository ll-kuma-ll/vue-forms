import * as index from "../"
import SlotFloatingLabelVue from "../SlotFloatingLabel.vue"
import SlotInputGroupVue from "../SlotInputGroup.vue"
import SlotLayoutFormVue from "../SlotLayoutForm.vue"
import SlotPanelInputGroupVue from "../SlotPanelInputGroup.vue"

it("SlotFloatingLabel", () => {
    expect(index.SlotFloatingLabel).toEqual(SlotFloatingLabelVue)
})

it("SlotInputGroup", () => {
    expect(index.SlotInputGroup).toEqual(SlotInputGroupVue)
})

it("SlotLayoutForm", () => {
    expect(index.SlotLayoutForm).toEqual(SlotLayoutFormVue)
})

it("SlotPanelInputGroup", () => {
    expect(index.SlotPanelInputGroup).toEqual(SlotPanelInputGroupVue)
})