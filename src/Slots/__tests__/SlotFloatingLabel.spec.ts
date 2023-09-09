import { cleanup, render, screen } from "@testing-library/vue"
import { afterEach, expect, it } from "vitest"
import SlotFloatingLabelVue from "../SlotFloatingLabel.vue"

const props = {
    label: "フローティングラベル",
}
const testid = "floating-label"

afterEach(cleanup)

it("ラベル表示", () => {
    render(SlotFloatingLabelVue, { props })
    expect(screen.getByTestId(testid).getElementsByTagName("label")[0]?.textContent).toBe(props.label)
})