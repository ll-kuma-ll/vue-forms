import { describe, expect, it } from "vitest"
import * as index from "./"
import * as forms from "./Forms"
import * as panels from "./Panels"
import * as slots from "./Slots"

describe("Forms", () => {
    it("FormInputText", () => {
        expect(index.FormInputText).toEqual(forms.FormInputText)
    })

    it("FormTextarea", () => {
        expect(index.FormTextarea).toEqual(forms.FormTextarea)
    })
})

describe("Panels", () => {
    it("PanelInputText", () => {
        expect(index.PanelInputText).toEqual(panels.PanelInputText)
    })
})

describe("Slots", () => {
    it("SlotInputGroup", () => {
        expect(index.SlotInputGroup).toEqual(slots.SlotInputGroup)
    })

    it("SlotLayoutForm", () => {
        expect(index.SlotLayoutForm).toEqual(slots.SlotLayoutForm)
    })
})