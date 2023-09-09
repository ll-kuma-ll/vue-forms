import { cleanup, render, screen } from "@testing-library/vue"
import { afterEach, describe, expect, it } from "vitest"
import PanelInputTextVue from "../PanelInputText.vue"

const props = {
    label: "ラベル",
    modelValue: "test@example.com",
}
const testid = {
    label: "slot-form-label",
    input: "slot-form-input",
}
const attrClass = {
    required: "form-mark-required",
    invalid: "invalid-feedback",
    text: "form-text",
}

afterEach(cleanup)

describe("標準", () => {
    it("レイアウト", () => {
        render(PanelInputTextVue, { props })

        expect(screen.getByTestId(testid.label).className).toBe("form-label")
        expect(screen.getByTestId(testid.input).className).toBe("")
    })

    it("ラベル表示", () => {
        render(PanelInputTextVue, { props })
        const label = screen.getByTestId(testid.label)
        const required = label.getElementsByClassName(attrClass.required)[0]

        expect(label.tagName).toBe('LABEL')
        expect(label.textContent).toBe(props.label)
        expect(required).toBeFalsy()
    })

    it("入力フォーム表示", () => {
        render(PanelInputTextVue, { props })
        const input = screen.getByTestId(testid.input)
        const formText = input.getElementsByTagName("input")[0]

        expect(formText).toBeTruthy()
        expect(formText.type).toBe("text")
        expect(formText.value).toBe(props.modelValue)
        expect(formText.placeholder).toBe("")
        expect(formText.disabled).toBe(false)
        expect(formText.className).toBe("form-control")
    })

    it("バリデーションエラー", () => {
        render(PanelInputTextVue, { props })
        const invalid = screen.getByTestId(testid.input).getElementsByClassName(attrClass.invalid)[0]

        expect(invalid).toBeFalsy()
    })

    it("テキスト", () => {
        render(PanelInputTextVue, { props })
        const text = screen.getByTestId(testid.input).getElementsByClassName(attrClass.text)[0]

        expect(text).toBeFalsy()
    })
})

describe("Props指定", () => {
    it("レイアウト", () => {
        render(PanelInputTextVue, { props: { ...props, horizontal: { label: 3, input: 9 } } })
        expect(screen.getByTestId(testid.label).className).toBe("col-sm-3 col-form-label")
        expect(screen.getByTestId(testid.input).className).toBe("col-sm-9")
    })

    it("ラベル", () => {
        render(PanelInputTextVue, { props: { ...props, label: "カスタム", required: true } })
        const label = screen.getByTestId(testid.label)

        expect(label.getElementsByClassName(attrClass.required)[0]).toBeTruthy()
        expect(label.textContent).toBe("カスタム*")
    })

    it("入力フォーム", () => {
        render(PanelInputTextVue, {
            props: {
                ...props,
                type: "email",
                placeholder: "プレースホルダー",
                disabled: true,
            },
        })
        const formText = screen.getByTestId(testid.input).getElementsByTagName("input")[0]

        expect(formText.type).toBe("email")
        expect(formText.placeholder).toBe("プレースホルダー")
        expect(formText.disabled).toBe(true)
    })

    it("サイズ小", () => {
        render(PanelInputTextVue, { props: { ...props, size: -1 } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].className).toBe("form-control form-control-sm")
    })

    it("サイズ大", () => {
        render(PanelInputTextVue, { props: { ...props, size: 1 } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].className).toBe("form-control form-control-lg")
    })

    it("バリデーションエラー", () => {
        render(PanelInputTextVue, { props: { ...props, invalid: "エラー" } })
        const formText = screen.getByTestId(testid.input).getElementsByTagName("input")[0]
        const feedback = screen.getByTestId(testid.input).getElementsByClassName(attrClass.invalid)[0]

        expect(formText.className).toBe("form-control is-invalid")
        expect(feedback).toBeTruthy()
        expect(feedback.textContent).toBe("エラー")
    })

    it("読み取り専用", () => {
        render(PanelInputTextVue, { props: { ...props, readonly: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].readOnly).toBe(true)
    })

    it("プレーンテキスト表示", () => {
        render(PanelInputTextVue, { props: { ...props, plaintext: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].className).toBe('form-control')
    })

    it("読み取り専用・プレーンテキスト表示", () => {
        render(PanelInputTextVue, { props: { ...props, plaintext: true, readonly: true } })
        const input = screen.getByTestId(testid.input).getElementsByTagName("input")[0]

        expect(input.className).toBe('form-control-plaintext')
        expect(input.readOnly).toBe(true)
    })

    it("テキスト", () => {
        render(PanelInputTextVue, { props: { ...props, text: "テキスト" } })
        const text = screen.getByTestId(testid.input).getElementsByClassName(attrClass.text)[0]

        expect(text).toBeTruthy()
        expect(text.textContent).toBe("テキスト")
    })
})