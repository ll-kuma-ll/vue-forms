import { expect, it } from "vitest"
import * as index from "../"
import SlotFormVue from "../SlotForm.vue"

it("SlotForm", () => {
    expect(index.SlotForm).toEqual(SlotFormVue)
})