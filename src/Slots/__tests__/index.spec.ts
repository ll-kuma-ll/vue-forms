import { expect, it } from "vitest"
import * as index from "../"
import SlotLayoutFormVue from "../SlotLayoutForm.vue"

it("SlotForm", () => {
    expect(index.SlotLayoutForm).toEqual(SlotLayoutFormVue)
})