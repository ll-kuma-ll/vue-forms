import { expect, it } from "vitest"
import * as index from "../"
import SlotInputGroupVue from "../SlotInputGroup.vue"
import SlotLayoutFormVue from "../SlotLayoutForm.vue"

it("SlotInputGroup", () => {
    expect(index.SlotInputGroup).toEqual(SlotInputGroupVue)
})

it("SlotLayoutForm", () => {
    expect(index.SlotLayoutForm).toEqual(SlotLayoutFormVue)
})