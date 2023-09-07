import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import { afterEach, describe, expect, it } from "vitest"
import PanelSelectOptionVue from "../PanelSelectOption.vue"

const choices = [
    { value: null, label: "選択..." },
    { value: "a100", label: "A 100" },
    { value: "b200", label: "B 200" },
]
const testid = {
    layout: "slot-form",
    label: "slot-form-label",
    input: "slot-form-input",
}
const attrClass = {
    required: "form-mark-required",
    invalid: "invalid-feedback",
    text: "form-text",
}

afterEach(cleanup)

describe("標準(単一選択)", () => {
    const props = {
        modelValue: choices[1].value,
        choices,
        label: "プルダウン選択",
    }

    it("レイアウト", () => {
        render(PanelSelectOptionVue, { props })
        expect(screen.getByTestId(testid.layout).className).toBe("")
        expect(screen.getByTestId(testid.label).className).toBe("form-label")
        expect(screen.getByTestId(testid.input).className).toBe("")
    })

    it("入力フォーム表示", () => {
        render(PanelSelectOptionVue, { props })
        const select = screen.getByTestId(testid.input).getElementsByTagName("select")[0]
        const opts = select?.getElementsByTagName("option")

        expect(select).toBeTruthy()
        expect(select.disabled).toBe(false)
        expect(select.multiple).toBe(false)

        expect(opts.length).toBe(choices.length)
        expect(opts[0].value).toBe(choices[0].label)
        expect(opts[0].textContent).toBe(choices[0].label)
        expect(opts[1].value).toBe(choices[1].value)
        expect(opts[1].textContent).toBe(choices[1].label)
    })

    it("ラベル表示", () => {
        render(PanelSelectOptionVue, { props })
        const label = screen.getByTestId(testid.label)
        const required = screen.getByTestId(testid.label).getElementsByClassName(attrClass.required)[0]

        expect(required).toBeFalsy()
        expect(label.textContent).toBe(props.label)
    })

    it("Props > required", () => {
        render(PanelSelectOptionVue, { props: { ...props, required: true } })
        const label = screen.getByTestId(testid.label)
        const required = screen.getByTestId(testid.label).getElementsByClassName(attrClass.required)[0]

        expect(required).toBeTruthy()
        expect(label.textContent).toBe(`${props.label}*`)
    })

    it("Props > disabled", () => {
        render(PanelSelectOptionVue, { props: { ...props, disabled: true } })
        const select = screen.getByTestId(testid.input).getElementsByTagName("select")[0]

        expect(select.disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(PanelSelectOptionVue, { props: { ...props, invalid: 'エラー' } })
        const select = screen.getByTestId(testid.input).getElementsByTagName("select")[0]
        const feedback = screen.getByTestId(testid.input).getElementsByClassName(attrClass.invalid)[0]

        expect(select.className).toBe("form-control is-invalid")
        expect(feedback).toBeTruthy()
        expect(feedback.textContent).toBe("エラー")
    })

    it("Props > text", () => {
        render(PanelSelectOptionVue, { props: { ...props, text: "説明文" } })
        const text = screen.getByTestId(testid.input).getElementsByClassName(attrClass.text)[0]

        expect(text).toBeTruthy()
        expect(text.textContent).toBe("説明文")
    })

    it("Props > horizontal", () => {
        render(PanelSelectOptionVue, { props: { ...props, horizontal: { label: 2, input: 10 } } })
        expect(screen.getByTestId(testid.layout).className).toBe("row")
        expect(screen.getByTestId(testid.label).className).toBe("col-sm-2 col-form-label")
        expect(screen.getByTestId(testid.input).className).toBe("col-sm-10")
    })

    it("Event > update:modelValue", async () => {
        const comp = render(PanelSelectOptionVue, { props })
        const updateValue = choices[2].value
        await fireEvent.update(screen.getByTestId(testid.input).getElementsByTagName("option")[2])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([updateValue])
    })
})

describe("複数選択", () => {
    const props = {
        modelValue: [choices[1].value],
        choices,
        label: "複数選択プルダウン",
    }

    it("入力フォーム表示", () => {
        render(PanelSelectOptionVue, { props })
        const select = screen.getByTestId(testid.input).getElementsByTagName("select")[0]
        const opts = select?.getElementsByTagName("option")

        expect(select).toBeTruthy()
        expect(select.disabled).toBe(false)
        expect(select.multiple).toBe(true)

        expect(opts.length).toBe(choices.length)
        expect(opts[0].value).toBe(choices[0].label)
        expect(opts[0].textContent).toBe(choices[0].label)
        expect(opts[1].value).toBe(choices[1].value)
        expect(opts[1].textContent).toBe(choices[1].label)
    })

    it("Event > update:modelValue", async () => {
        const comp = render(PanelSelectOptionVue, { props })
        const updateValue = [choices[1].value, choices[2].value]
        await fireEvent.update(screen.getByTestId(testid.input).getElementsByTagName("option")[2])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([expect.arrayContaining(updateValue)])
    })
})