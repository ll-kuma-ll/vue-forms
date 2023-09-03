import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import { afterEach, describe, expect, it } from "vitest"
import FormInputCheckVue from "../FormInputCheck.vue"

const choices = [
    { value: "v1", label: "value 1" },
    { value: "v2", label: "value 2", id: "original-id-2" },
    { value: "v3", label: "value 3" },
]
const testid = "form-input-check"

afterEach(cleanup)

describe("radio", () => {
    const props = { modelValue: choices[1].value, choices }

    it("radioボタンが表示される", () => {
        render(FormInputCheckVue, { props })
        const radios = screen.getAllByTestId(testid)
        let input: HTMLInputElement
        let label: HTMLLabelElement

        expect(radios.length).toBe(choices.length)
        expect(radios[0].className).toBe("form-check form-check-inline")

        input = radios[0].getElementsByTagName("input")[0]
        label = radios[0].getElementsByTagName("label")[0]
        expect(input).toBeTruthy()
        expect(input.type).toBe("radio")
        expect(input.value).toBe(choices[0].value)
        expect(input.className).toBe("form-check-input")
        expect(input.disabled).toBe(false)
        expect(input.id.length).toBe(36)
        expect(input.id).toBe(label.getAttribute("for"))
        expect(label.textContent).toBe(choices[0].label)

        input = radios[1].getElementsByTagName("input")[0]
        label = radios[1].getElementsByTagName("label")[0]
        expect(input).toBeTruthy()
        expect(input.type).toBe("radio")
        expect(input.value).toBe(choices[1].value)
        expect(input.className).toBe("form-check-input")
        expect(input.disabled).toBe(false)
        expect(input.id).toBe(choices[1].id)
        expect(input.id).toBe(label.getAttribute("for"))
        expect(label.textContent).toBe(choices[1].label)
    })

    it("Props > disabled", () => {
        render(FormInputCheckVue, { props: { ...props, disabled: true } })
        const radios = screen.getAllByTestId(testid)

        expect(radios[0].getElementsByTagName("input")[0].disabled).toBe(true)
        expect(radios[1].getElementsByTagName("input")[0].disabled).toBe(true)
        expect(radios[2].getElementsByTagName("input")[0].disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(FormInputCheckVue, { props: { ...props, invalid: "エラー" } })
        const radios = screen.getAllByTestId(testid)

        expect(radios[0].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
        expect(radios[1].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
        expect(radios[2].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
    })

    it("Props > inline", () => {
        render(FormInputCheckVue, { props: { ...props, inline: false } })
        const radios = screen.getAllByTestId(testid)

        expect(radios[0].className).toBe("form-check")
        expect(radios[1].className).toBe("form-check")
        expect(radios[2].className).toBe("form-check")
    })

    it("model-value is null", () => {
        render(FormInputCheckVue, { props: { ...props, modelValue: null } })
        expect(screen.getAllByTestId(testid)[0].getElementsByTagName("input")[0].type).toBe("radio")
    })

    it("Event > update:modelValue", async () => {
        const comp = render(FormInputCheckVue, { props })
        await fireEvent.update(screen.getAllByTestId(testid)[2].getElementsByTagName("input")[0])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([choices[2].value])
    })
})

describe("checkbox", () => {
    const props = { modelValue: [choices[1].value], choices }

    it("radioボタンが表示される", () => {
        render(FormInputCheckVue, { props })
        const checkboxs = screen.getAllByTestId(testid)
        let input: HTMLInputElement
        let label: HTMLLabelElement

        expect(checkboxs.length).toBe(choices.length)
        expect(checkboxs[0].className).toBe("form-check form-check-inline")

        input = checkboxs[0].getElementsByTagName("input")[0]
        label = checkboxs[0].getElementsByTagName("label")[0]
        expect(input).toBeTruthy()
        expect(input.type).toBe("checkbox")
        expect(input.value).toBe(choices[0].value)
        expect(input.className).toBe("form-check-input")
        expect(input.disabled).toBe(false)
        expect(input.id.length).toBe(36)
        expect(input.id).toBe(label.getAttribute("for"))
        expect(label.textContent).toBe(choices[0].label)

        input = checkboxs[1].getElementsByTagName("input")[0]
        label = checkboxs[1].getElementsByTagName("label")[0]
        expect(input).toBeTruthy()
        expect(input.type).toBe("checkbox")
        expect(input.value).toBe(choices[1].value)
        expect(input.className).toBe("form-check-input")
        expect(input.disabled).toBe(false)
        expect(input.id).toBe(choices[1].id)
        expect(input.id).toBe(label.getAttribute("for"))
        expect(label.textContent).toBe(choices[1].label)
    })

    it("Props > disabled", () => {
        render(FormInputCheckVue, { props: { ...props, disabled: true } })
        const checkboxs = screen.getAllByTestId(testid)

        expect(checkboxs[0].getElementsByTagName("input")[0].disabled).toBe(true)
        expect(checkboxs[1].getElementsByTagName("input")[0].disabled).toBe(true)
        expect(checkboxs[2].getElementsByTagName("input")[0].disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(FormInputCheckVue, { props: { ...props, invalid: "エラー" } })
        const checkboxs = screen.getAllByTestId(testid)

        expect(checkboxs[0].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
        expect(checkboxs[1].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
        expect(checkboxs[2].getElementsByTagName("input")[0].className).toBe("form-check-input is-invalid")
    })

    it("Props > inline", () => {
        render(FormInputCheckVue, { props: { ...props, inline: false } })
        const checkboxs = screen.getAllByTestId(testid)

        expect(checkboxs[0].className).toBe("form-check")
        expect(checkboxs[1].className).toBe("form-check")
        expect(checkboxs[2].className).toBe("form-check")
    })

    it("model-value is empty", () => {
        render(FormInputCheckVue, { props: { ...props, modelValue: [] } })
        expect(screen.getAllByTestId(testid)[0].getElementsByTagName("input")[0].type).toBe("checkbox")
    })

    it("Event > update:modelValue", async () => {
        const comp = render(FormInputCheckVue, { props })
        await fireEvent.update(screen.getAllByTestId(testid)[2].getElementsByTagName("input")[0])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([[choices[1].value, choices[2].value]])
    })
})