import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import { afterEach, describe, expect, it } from "vitest"
import FormSelectOptionVue from "../FormSelectOption.vue"

const choices = [
    { value: 64, label: "ラベル64" },
    { value: 128, label: "ラベル128" },
]
const testid = "form-select"

afterEach(cleanup)

describe("単一選択", () => {
    const props = {
        modelValue: choices[1].value,
        choices,
    }

    it("Select > Option タグが表示される", () => {
        render(FormSelectOptionVue, { props })
        const select: HTMLSelectElement = screen.getByTestId(testid)
        const options = select.getElementsByTagName("option")

        expect(select.multiple).toBe(false)
        expect(select.className).toBe("form-control")

        expect(options.length).toBe(props.choices.length)
        expect(options[0].value).toBe(props.choices[0].value.toString())
        expect(options[0].textContent).toBe(props.choices[0].label)
        expect(options[1].value).toBe(props.choices[1].value.toString())
        expect(options[1].textContent).toBe(props.choices[1].label)
    })

    it("Props > disabled", () => {
        render(FormSelectOptionVue, { props: { ...props, disabled: true } })
        expect((screen.getByTestId(testid) as HTMLSelectElement).disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(FormSelectOptionVue, { props: { ...props, invalid: "エラー" } })
        expect(screen.getByTestId(testid).className).toBe("form-control is-invalid")
    })

    it("Event > update:modelValue", async () => {
        const comp = render(FormSelectOptionVue, { props })
        const updateValue = choices[0].value
        await fireEvent.update(screen.getByTestId(testid).getElementsByTagName("option")[0])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted("update:modelValue")[0]).toEqual([updateValue])
    })
})

describe("複数選択", () => {
    const props = {
        modelValue: [choices[1].value],
        choices,
    }

    it("Select > Option タグが表示される", () => {
        render(FormSelectOptionVue, { props })
        const select: HTMLSelectElement = screen.getByTestId(testid)
        const options = select.getElementsByTagName("option")

        expect(select.multiple).toBe(true)
        expect(select.className).toBe("form-control")

        expect(options.length).toBe(props.choices.length)
        expect(options[0].value).toBe(props.choices[0].value.toString())
        expect(options[0].textContent).toBe(props.choices[0].label)
        expect(options[1].value).toBe(props.choices[1].value.toString())
        expect(options[1].textContent).toBe(props.choices[1].label)
    })

    it("Props > disabled", () => {
        render(FormSelectOptionVue, { props: { ...props, disabled: true } })
        expect((screen.getByTestId(testid) as HTMLSelectElement).disabled).toBe(true)
    })

    it("Props > invalid", () => {
        render(FormSelectOptionVue, { props: { ...props, invalid: "エラー" } })
        expect(screen.getByTestId(testid).className).toBe("form-control is-invalid")
    })

    it("Event > update:modelValue", async () => {
        const comp = render(FormSelectOptionVue, { props })
        const updateValue = [choices[0].value, choices[1].value]
        await fireEvent.update(screen.getByTestId(testid).getElementsByTagName("option")[0])

        expect(comp.emitted("update:modelValue")).toBeTruthy()
        expect(comp.emitted<number[]>("update:modelValue")[0][0]).toContain(updateValue[0])
        expect(comp.emitted<number[]>("update:modelValue")[0][0]).toContain(updateValue[1])
    })
})