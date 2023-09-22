import { cleanup, render, screen } from "@testing-library/vue"
import SlotFormVue from "../SlotLayoutForm.vue"

const className = {
    required: 'form-mark-required',
    invalid: "invalid-feedback",
    text: "form-text",
}
const testid = {
    root: "slot-form",
    label: "slot-form-label",
    input: "slot-form-input",
}
const slots = {
    label: '<span class="label">ラベル</span>',
    default: '<input type="text" id="slot-input-tag">',
}

describe('標準レイアウトが表示される', () => {
    test("slot #label", () => {
        render(SlotFormVue, { slots })
        const label: HTMLLabelElement = screen.getByTestId(testid.label)
        const required = label.getElementsByClassName(className.required)[0]

        expect(screen.getByTestId(testid.root).className).toBe("")
        expect(label.className).toBe("form-label")
        expect(label.innerHTML).toMatch(slots.label)
        expect(required).toBeFalsy()
    })

    test("slot #default", () => {
        render(SlotFormVue, { slots })
        const form = screen.getByTestId(testid.input)

        expect(form.className).toBe('')
        expect(form.innerHTML).toMatch(slots.default)
    })

    test("バリデーションエラー", () => {
        render(SlotFormVue)
        expect(screen.getByTestId(testid.input).getElementsByClassName(className.invalid)[0]).toBeFalsy()
    })

    test("テキスト", () => {
        render(SlotFormVue)
        expect(screen.getByTestId(testid.input).getElementsByClassName(className.text)[0]).toBeFalsy()
    })
})

describe("Props 指定レイアウト", () => {
    test("必須", () => {
        render(SlotFormVue, { slots, props: { required: true } })
        expect(screen.getByTestId(testid.label).getElementsByClassName(className.required)[0]).toBeTruthy()
    })

    test("バリデーションエラー", () => {
        const invalid = "エラー"
        render(SlotFormVue, { slots, props: { invalid } })
        const feedback = screen.getByTestId(testid.input).getElementsByClassName(className.invalid)[0]

        expect(feedback).toBeTruthy()
        expect(feedback.textContent).toBe(invalid)
    })

    test("テキスト表示", () => {
        const text = "メッセージ"
        render(SlotFormVue, { slots, props: { text } })
        const msg = screen.getByTestId(testid.input).getElementsByClassName(className.text)[0]

        expect(msg).toBeTruthy()
        expect(msg.textContent).toBe(text)
    })

    test("水平表示", () => {
        render(SlotFormVue, { slots, props: { horizontal: { label: 3, input: 9 } } })
        expect(screen.getByTestId(testid.root).className).toBe("row")
        expect(screen.getByTestId(testid.label).className).toBe("col-sm-3 col-form-label")
        expect(screen.getByTestId(testid.input).className).toBe("col-sm-9")
    })
})