import { render, screen } from "@testing-library/vue"
import { expect, it } from "vitest"
import SlotInputGroupVue from "../SlotInputGroup.vue"

const slots = {
    default: '<input type="text">',
}
const testid = "input-group"

it("slot #default", () => {
    render(SlotInputGroupVue, { slots })
    expect(screen.getByTestId(testid).innerHTML).toBe(slots.default)
})