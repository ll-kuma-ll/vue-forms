import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import FormInputCheckVue from "../FormInputCheck.vue"

const choices = [
    { value: "v1", label: "value 1" },
    { value: "v2", label: "value 2", id: "original-id-2" },
    { value: "v3", label: "value 3" },
]
const testid = "form-input-check"

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

    it("Props > readonly", () => {
        render(FormInputCheckVue, { props: { ...props, readonly: true } })
        const inputs = screen.getAllByTestId(testid)

        expect(inputs[0].className).toBe("form-check form-check-inline")
        //expect((inputs[0] as HTMLInputElement).readOnly).toBe(true)
    })
    
    it("Props > plaintext", () => {
        render(FormInputCheckVue, { props: { ...props, plaintext: true } })
        const inputs = screen.getAllByTestId(testid)

        expect(inputs[0].className).toBe("form-check form-check-inline")
    })
    
    it("Props > readonly & plaintext", () => {
        render(FormInputCheckVue, { props: { ...props, readonly: true, plaintext: true } })
        const input = screen.getByTestId("form-input-text") as HTMLTextAreaElement

        expect(input.className).toBe("form-control-plaintext")
        expect(input.readOnly).toBe(true)
        expect(input.value).toBe(choices[1].label)
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

    it("Props > readonly", () => {
        render(FormInputCheckVue, { props: { ...props, readonly: true } })
        const inputs = screen.getAllByTestId(testid)

        expect(inputs[0].className).toBe("form-check form-check-inline")
        //expect((inputs[0] as HTMLInputElement).readOnly).toBe(true)
    })
    
    it("Props > plaintext", () => {
        render(FormInputCheckVue, { props: { ...props, plaintext: true } })
        const inputs = screen.getAllByTestId(testid)

        expect(inputs[0].className).toBe("form-check form-check-inline")
    })
    
    it("Props > readonly & plaintext", () => {
        render(FormInputCheckVue, { props: { ...props, readonly: true, plaintext: true } })
        const list = screen.getByTestId("readonly-list").getElementsByTagName("li")

        expect(list.length).toBe(props.modelValue.length)
        expect(list[0].textContent).toBe(choices[1].label)
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