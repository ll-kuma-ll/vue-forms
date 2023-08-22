import { describe, expect, it } from "vitest"
import * as index from "./"
import * as forms from "./Forms"
import * as panels from "./Panels"
import * as slots from "./Slots"

describe("Forms", () => {
    it("FormInputText", () => {
        expect(index.FormInputText).toEqual(forms.FormInputText)
    })
})

describe("Panels", () => {
    it("PanelInputText", () => {
        expect(index.PanelInputText).toEqual(panels.PanelInputText)
    })
})

describe("Slots", () => {
    it("SlotLayoutForm", () => {
        expect(index.SlotLayoutForm).toEqual(slots.SlotLayoutForm)
    })
})