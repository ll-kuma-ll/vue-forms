import { describe, expect, it } from "vitest"
import * as index from "./"
import * as forms from "./Forms"
import * as slots from "./Slots"

describe("Forms", () => {
    it("FormInputText", () => {
        expect(index.FormInputText).toEqual(forms.FormInputText)
    })
})

describe("Slots", () => {
    it("SlotForm", () => {
        expect(index.SlotForm).toEqual(slots.SlotForm)
    })
})