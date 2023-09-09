import { cleanup, render, screen } from "@testing-library/vue"
import { afterEach, expect, it } from "vitest"
import SlotPanelInputGroupVue from "../SlotPanelInputGroup.vue"

const slots = {
    default: '<input type="text" class="form-control">',
}
const props = {
    label: "Input Group パネル"
}
const className = {
    required: 'form-mark-required',
    invalid: "invalid-feedback",
    text: "form-text",
}
const testid = {
    root: "slot-form",
    label: "slot-form-label",
    input: "slot-form-input",
    group: "input-group",
}

afterEach(cleanup)

it(".input-group にスロット表示", () => {
    render(SlotPanelInputGroupVue, { slots, props })
    expect(screen.getByTestId(testid.group).innerHTML).toBe(slots.default)
})

it("必須", () => {
    render(SlotPanelInputGroupVue, { slots, props: { ...props, required: true } })
    expect(screen.getByTestId(testid.label).getElementsByClassName(className.required)[0]).toBeTruthy()
})

it("バリデーションエラー", () => {
    const invalid = "エラー"
    render(SlotPanelInputGroupVue, { slots, props: { ...props, invalid } })
    const feedback = screen.getByTestId(testid.input).getElementsByClassName(className.invalid)[0]

    expect(feedback).toBeTruthy()
    expect(feedback.textContent).toBe(invalid)
})

it("テキスト表示", () => {
    const text = "メッセージ"
    render(SlotPanelInputGroupVue, { slots, props: { ...props, text } })
    const msg = screen.getByTestId(testid.input).getElementsByClassName(className.text)[0]

    expect(msg).toBeTruthy()
    expect(msg.textContent).toBe(text)
})

it("水平表示", () => {
    render(SlotPanelInputGroupVue, { slots, props: { ...props, horizontal: { label: 3, input: 9 } } })
    expect(screen.getByTestId(testid.root).className).toBe("row")
    expect(screen.getByTestId(testid.label).className).toBe("col-sm-3 col-form-label")
    expect(screen.getByTestId(testid.input).className).toBe("col-sm-9")
})
