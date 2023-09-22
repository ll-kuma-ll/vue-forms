import { cleanup, render, screen } from "@testing-library/vue"
import SlotFloatingLabelVue from "../SlotFloatingLabel.vue"

const props = {
    label: "フローティングラベル",
}
const testid = "floating-label"

it("ラベル表示", () => {
    render(SlotFloatingLabelVue, { props })
    expect(screen.getByTestId(testid).getElementsByTagName("label")[0]?.textContent).toBe(props.label)
})