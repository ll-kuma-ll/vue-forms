import { afterEach, describe, expect, it } from "vitest"
import PanelInputCheckVue from "../PanelInputCheck.vue"
import { cleanup, fireEvent, render, screen } from "@testing-library/vue"

const choices = [
    { value: "v1", label: "value 1" },
    { value: "v2", label: "value 2", id: "original-id-2" },
    { value: "v3", label: "value 3" },
]
const testid = {
    layout: "slot-form",
    label: "slot-form-label",
    input: "slot-form-input",
    check: "form-input-check",
}
const selector = {
    required: "form-mark-required",
    text: "form-text",
}

afterEach(cleanup)
describe("radio", () => {
    const props = {
        modelValue: choices[1].value,
        choices,
        label: "Radioボタン",
    }

    it("レイアウト", () => {
        render(PanelInputCheckVue, { props })
        expect(screen.getByTestId(testid.layout).className).toBe("")
        expect(screen.getByTestId(testid.label).className).toBe("form-label")
        expect(screen.getByTestId(testid.input).className).toBe("")
        expect(screen.getAllByTestId(testid.check)[0].className).toBe("form-check form-check-inline")
        expect(screen.getByTestId(testid.input).getElementsByClassName(selector.text)[0]).toBeFalsy()
    })

    it("ラベル", () => {
        render(PanelInputCheckVue, { props })
        const label = screen.getByTestId(testid.label)

        expect(label.getElementsByClassName(selector.required)[0]).toBeFalsy()
        expect(label.textContent).toBe(props.label)
    })

    it("radioボタン", () => {
        render(PanelInputCheckVue, { props })
        const inputs = screen.getAllByTestId(testid.check)
        let radio: HTMLInputElement
        let label: HTMLLabelElement

        expect(inputs.length).toBe(choices.length)

        radio = inputs[0].getElementsByTagName("input")[0]
        label = inputs[0].getElementsByTagName("label")[0]
        expect(radio).toBeTruthy()
        expect(radio.type).toBe("radio")
        expect(radio.className).toBe("form-check-input")
        expect(radio.value).toBe(choices[0].value)
        expect(radio.id).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)
        expect(label).toBeTruthy()
        expect(label.textContent).toBe(choices[0].label)

        radio = inputs[1].getElementsByTagName("input")[0]
        label = inputs[1].getElementsByTagName("label")[0]
        expect(radio).toBeTruthy()
        expect(radio.type).toBe("radio")
        expect(radio.className).toBe("form-check-input")
        expect(radio.value).toBe(choices[1].value)
        expect(radio.id).toBe(choices[1].id)
        expect(label).toBeTruthy()
        expect(label.textContent).toBe(choices[1].label)
    })

    it("Props > disabled", () => {
        render(PanelInputCheckVue, { props: { ...props, disabled: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(PanelInputCheckVue, { props: { ...props, invalid: "エラー" } })
        const inputs = screen.getByTestId(testid.input).getElementsByTagName("input")
        const feedback = screen.getByTestId(testid.input).getElementsByClassName("invalid-feedback")[0]

        expect(inputs[0].className).toBe("form-check-input is-invalid")
        expect(feedback).toBeTruthy()
        expect(feedback.textContent).toBe("エラー")
    })

    it("Props > inline", () => {
        render(PanelInputCheckVue, { props: { ...props, inline: false } })
        expect(screen.getAllByTestId(testid.check)[0].className).toBe("form-check")
    })

    it("Props > required", () => {
        render(PanelInputCheckVue, { props: { ...props, required: true } })
        const label = screen.getByTestId(testid.label)

        expect(label.getElementsByClassName(selector.required)[0]).toBeTruthy()
        expect(label.textContent).toBe(`${props.label}*`)
    })

    it("Props > text", () => {
        render(PanelInputCheckVue, { props: { ...props, text: "説明文" } })
        const text = screen.getByTestId(testid.input).getElementsByClassName(selector.text)[0]

        expect(text).toBeTruthy()
        expect(text.textContent).toBe("説明文")
    })

    it("Props > horizontal", () => {
        render(PanelInputCheckVue, { props: { ...props, horizontal: { label: 2, input: 10 } } })
        expect(screen.getByTestId(testid.layout).className).toBe("row")
        expect(screen.getByTestId(testid.label).className).toBe("col-sm-2 col-form-label")
        expect(screen.getByTestId(testid.input).className).toBe("col-sm-10")
    })

    it("Props > readonly", () => {
        render(PanelInputCheckVue, { props: { ...props, readonly: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].readOnly).toBe(true)
    })

    it("Props > plaintext", () => {
        render(PanelInputCheckVue, { props: { ...props, plaintext: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].className).toBe('form-check-input')
    })

    it("Props > readony & plaintext", () => {
        render(PanelInputCheckVue, { props: { ...props, plaintext: true, readonly: true } })
        const inputs = screen.getByTestId(testid.input).getElementsByTagName("input")

        expect(inputs.length).toBe(1)
        expect(inputs[0].value).toBe(choices[1].label)
        expect(inputs[0].type).toBe("text")
        expect(inputs[0].readOnly).toBe(true)
        expect(inputs[0].className).toBe("form-control-plaintext")
    })

    it("Event > update:modelValue", async () => {
        const { emitted } = render(PanelInputCheckVue, { props })
        await fireEvent.update(screen.getAllByTestId(testid.check)[2].getElementsByTagName("input")[0])
        expect(emitted("update:modelValue")).toBeTruthy()
        expect(emitted("update:modelValue")[0]).toEqual([choices[2].value])
    })
})

describe("checkbox", () => {
    const props = {
        modelValue: [choices[0].value],
        choices,
        label: 'Checkboxボタン',
    }

    it("radioボタン", () => {
        render(PanelInputCheckVue, { props })
        const inputs = screen.getAllByTestId(testid.check)
        let check: HTMLInputElement
        let label: HTMLLabelElement

        expect(inputs.length).toBe(choices.length)

        check = inputs[0].getElementsByTagName("input")[0]
        label = inputs[0].getElementsByTagName("label")[0]
        expect(check).toBeTruthy()
        expect(check.type).toBe("checkbox")
        expect(check.className).toBe("form-check-input")
        expect(check.value).toBe(choices[0].value)
        expect(check.id).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)
        expect(label).toBeTruthy()
        expect(label.textContent).toBe(choices[0].label)

        check = inputs[1].getElementsByTagName("input")[0]
        label = inputs[1].getElementsByTagName("label")[0]
        expect(check).toBeTruthy()
        expect(check.type).toBe("checkbox")
        expect(check.className).toBe("form-check-input")
        expect(check.value).toBe(choices[1].value)
        expect(check.id).toBe(choices[1].id)
        expect(label).toBeTruthy()
        expect(label.textContent).toBe(choices[1].label)
    })

    it("Props > disabled", () => {
        render(PanelInputCheckVue, { props: { ...props, disabled: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(PanelInputCheckVue, { props: { ...props, invalid: "エラー" } })
        const inputs = screen.getByTestId(testid.input).getElementsByTagName("input")
        const feedback = screen.getByTestId(testid.input).getElementsByClassName("invalid-feedback")[0]

        expect(inputs[0].className).toBe("form-check-input is-invalid")
        expect(feedback).toBeTruthy()
        expect(feedback.textContent).toBe("エラー")
    })

    it("Props > inline", () => {
        render(PanelInputCheckVue, { props: { ...props, inline: false } })
        expect(screen.getAllByTestId(testid.check)[0].className).toBe("form-check")
    })

    it("Props > required", () => {
        render(PanelInputCheckVue, { props: { ...props, required: true } })
        const label = screen.getByTestId(testid.label)

        expect(label.getElementsByClassName(selector.required)[0]).toBeTruthy()
        expect(label.textContent).toBe(`${props.label}*`)
    })

    it("Props > readonly", () => {
        render(PanelInputCheckVue, { props: { ...props, readonly: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].readOnly).toBe(true)
    })

    it("Props > plaintext", () => {
        render(PanelInputCheckVue, { props: { ...props, plaintext: true } })
        expect(screen.getByTestId(testid.input).getElementsByTagName("input")[0].className).toBe('form-check-input')
    })

    it("Props > readony & plaintext", () => {
        render(PanelInputCheckVue, { props: { ...props, plaintext: true, readonly: true } })
        const list = screen.getByTestId("readonly-list").getElementsByTagName("li")

        expect(list.length).toBe(props.modelValue.length)
        expect(list[0].textContent).toBe(choices[0].label)
    })

    it("Event > update:modelValue", async () => {
        const { emitted } = render(PanelInputCheckVue, { props })
        await fireEvent.update(screen.getAllByTestId(testid.check)[2].getElementsByTagName("input")[0])

        expect(emitted("update:modelValue")).toBeTruthy()
        expect(emitted("update:modelValue")[0]).toEqual([[choices[0].value, choices[2].value]])
    })
})