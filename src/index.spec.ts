import { describe, expect, it } from "vitest"
import * as index from "./"
import * as forms from "./Forms"
import * as panels from "./Panels"
import * as slots from "./Slots"

describe("Forms", () => {
    it("FormInputCheck", () => {
        expect(index.FormInputCheck).toEqual(forms.FormInputCheck)
    })

    it("FormInputText", () => {
        expect(index.FormInputText).toEqual(forms.FormInputText)
    })

    it("FormTextarea", () => {
        expect(index.FormTextarea).toEqual(forms.FormTextarea)
    })

    it("FormSelectOption", () => {
        expect(index.FormSelectOption).toEqual(forms.FormSelectOption)
    })

    it("ReadonlyList", () => {
        expect(index.ReadonlyList).toEqual(forms.ReadonlyList)
    })
})

describe("Panels", () => {
    it("PanelInputCheck", () => {
        expect(index.PanelInputCheck).toEqual(panels.PanelInputCheck)
    })

    it("PanelInputText", () => {
        expect(index.PanelInputText).toEqual(panels.PanelInputText)
    })

    it("PanelTextarea", () => {
        expect(index.PanelTextarea).toEqual(panels.PanelTextarea)
    })

    it("PanelSelectOption", () => {
        expect(index.PanelSelectOption).toEqual(panels.PanelSelectOption)
    })
})

describe("Slots", () => {
    it("SlotFloatingLabel", () => {
        expect(index.SlotFloatingLabel).toEqual(slots.SlotFloatingLabel)
    })

    it("SlotInputGroup", () => {
        expect(index.SlotInputGroup).toEqual(slots.SlotInputGroup)
    })

    it("SlotLayoutForm", () => {
        expect(index.SlotLayoutForm).toEqual(slots.SlotLayoutForm)
    })

    it("SlotPanelInputGroup", () => {
        expect(index.SlotPanelInputGroup).toEqual(slots.SlotPanelInputGroup)
    })
})