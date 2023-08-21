import { afterEach, expect, test } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import FormInputTextVue from "../FormInputText.vue"

afterEach(cleanup)

const props = {
    modelValue: "test@example.com",
}
const getElement = (): HTMLInputElement => screen.getByTestId("form-input-text")

test("INPUTタグが表示される", () => {
    render(FormInputTextVue, { props })
    const input = getElement()

    expect(input.type).toBe("text")
    expect(input.value).toBe(props.modelValue)
    expect(input.className).toBe("form-control")
    expect(input.disabled).toBe(false)
})

test("Props > type", () => {
    render(FormInputTextVue, { props: { ...props, type: "email" } })
    expect(getElement().type).toBe("email")
})

test("Props > placeholder", () => {
    const placeholder = "プレースホルダー"
    render(FormInputTextVue, { props: { ...props, placeholder } })
    expect(getElement().placeholder).toBe(placeholder)
})

test("Props > disabled", () => {
    render(FormInputTextVue, { props: { ...props, disabled: true } })
    expect(getElement().disabled).toBe(true)
})

test("Props > invalid", () => {
    render(FormInputTextVue, { props: { ...props, invalid: "エラー" } })
    expect(getElement().className).toBe("form-control is-invalid")
})

test("Emit > update:modelValue", async () => {
    const comp = render(FormInputTextVue, { props })
    const updateValue = "更新値"
    const emit = "update:modelValue"

    await fireEvent.update(getElement(), updateValue)
    expect(comp.emitted(emit)).toBeTruthy()
    expect(comp.emitted(emit)[0]).toEqual([updateValue])
})