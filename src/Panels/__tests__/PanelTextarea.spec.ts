import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, describe, expect, it } from "vitest";
import PanelTextareaVue from "../PanelTextarea.vue"

const props = {
    modelValue: "複数行\nテキスト",
    label: "項目名",
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
        render(PanelTextareaVue, { props })
        expect(screen.getByTestId(testid.label).className).toBe("form-label")
        expect(screen.getByTestId(testid.input).className).toBe("")
    })

    it("ラベル表示", () => {
        render(PanelTextareaVue, { props })
        const label = screen.getByTestId(testid.label)
        const required = screen.getByTestId(testid.label).getElementsByClassName(attrClass.required)[0]

        expect(label.textContent).toBe(props.label)
        expect(required).toBeFalsy()
    })

    it("入力フォーム表示", () => {
        render(PanelTextareaVue, { props })
        const textarea = screen.getByTestId(testid.input).getElementsByTagName("textarea")[0]

        expect(textarea).toBeTruthy()
        expect(textarea.value).toBe(props.modelValue)
        expect(textarea.placeholder).toBe("")
        expect(textarea.disabled).toBe(false)
        expect(textarea.className).toBe("form-control")
    })

    it("バリデーションエラー", () => {
        render(PanelTextareaVue, { props })
        const invalid = screen.getByTestId(testid.input).getElementsByClassName(attrClass.invalid)[0]

        expect(invalid).toBeFalsy()
    })

    it("テキスト", () => {
        render(PanelTextareaVue, { props })
        const text = screen.getByTestId(testid.input).getElementsByClassName(attrClass.text)[0]

        expect(text).toBeFalsy()
    })

    it("Event > update:modelValue", async () => {
        const comp = render(PanelTextareaVue, { props })
        const updateValue = "更新\nテキスト内容"
        await fireEvent.update(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0], updateValue)

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([updateValue])
    })
})

describe("Props指定", () => {
    it("Props > required", () => {
        render(PanelTextareaVue, { props: { ...props, required: true } })
        expect(screen.getByTestId(testid.label).getElementsByClassName(attrClass.required)).toBeTruthy()
        expect(screen.getByTestId(testid.label).textContent).toBe(`${props.label}*`)
    })

    it("Props > placeholder", () => {
        render(PanelTextareaVue, { props: { ...props, placeholder: "プレースホルダー" } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0].placeholder).toBe("プレースホルダー")
    })

    it("Props > disabled", () => {
        render(PanelTextareaVue, { props: { ...props, disabled: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0].disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(PanelTextareaVue, { props: { ...props, invalid: "エラー"}})
        expect(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0].className).toBe("form-control is-invalid")
        expect(screen.getByTestId(testid.input).getElementsByClassName(attrClass.invalid)[0].textContent).toBe("エラー")
    })

    it("Props > text", () => {
        render(PanelTextareaVue, { props: { ...props, text: "説明文" } })
        expect(screen.getByTestId(testid.input).getElementsByClassName(attrClass.text)[0].textContent).toBe("説明文")
    })

    it("Props > horizontal", () => {
        render(PanelTextareaVue, { props: { ...props, horizontal: { label: 2, input: 10 } } })
        expect(screen.getByTestId(testid.label).className).toBe("col-sm-2 col-form-label")
        expect(screen.getByTestId(testid.input).className).toBe("col-sm-10")
    })

    it("Props > readonly", () => {
        render(PanelTextareaVue, { props: { ...props, readonly: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0].readOnly).toBe(true)
    })

    it("Props > plaintext", () => {
        render(PanelTextareaVue, { props: { ...props, plaintext: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("textarea")[0].className).toBe('form-control')
    })

    it("Props > readony & plaintext", () => {
        render(PanelTextareaVue, { props: { ...props, plaintext: true, readonly: true } })
        const textarea = screen.getByTestId(testid.input).getElementsByTagName("textarea")[0]

        expect(textarea.className).toBe('form-control-plaintext')
        expect(textarea.readOnly).toBe(true)
    })
})