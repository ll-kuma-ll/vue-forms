import { expect, it } from "vitest"
import * as index from ".."
import PanelInputTextVue from "../PanelInputText.vue"

it("PanelInputText", () => {
    expect(index.PanelInputText).toEqual(PanelInputTextVue)
})