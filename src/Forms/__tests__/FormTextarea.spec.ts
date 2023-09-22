import { cleanup, fireEvent, render, screen } from "@testing-library/vue"
import FormTextareaVue from "../FormTextarea.vue"

const props = {
    modelValue: "複数行\nテキスト",
}
const testid = "form-textarea"

it("TEXTAREAタグが表示される", () => {
    render(FormTextareaVue, { props })
    const textarea: HTMLTextAreaElement = screen.getByTestId(testid)

    expect(textarea.value).toBe(props.modelValue)
    expect(textarea.className).toBe("form-control")
    expect(textarea.placeholder).toBe("")
    expect(textarea.disabled).toBe(false)
})

it("Props > placeholder", () => {
    render(FormTextareaVue, { props: { ...props, placeholder: "プレースホルダー" } })
    const textarea: HTMLTextAreaElement = screen.getByTestId(testid)

    expect(textarea.placeholder).toBe("プレースホルダー")
})

it("Props > disabled", () => {
    render(FormTextareaVue, { props: { ...props, disabled: true } })
    const textarea: HTMLTextAreaElement = screen.getByTestId(testid)

    expect(textarea.disabled).toBe(true)
})

it("Prpos > size > -1", () => {
    render(FormTextareaVue, { props: { ...props, size: -1 } })
    expect(screen.getByTestId(testid).className).toBe("form-control form-control-sm")
})

it("Props > size > 1", () => {
    render(FormTextareaVue, { props: { ...props, size: 1 } })
    expect(screen.getByTestId(testid).className).toBe("form-control form-control-lg")
})

it("Props > invalid", () => {
    render(FormTextareaVue, { props: { ...props, invalid: "エラー" } })
    const textarea: HTMLTextAreaElement = screen.getByTestId(testid)

    expect(textarea.className).toBe("form-control is-invalid")
})

it("Props > readonly", () => {
    render(FormTextareaVue, { props: { ...props, readonly: true } })
    const input = screen.getByTestId(testid) as HTMLTextAreaElement

    expect(input.className).toBe("form-control")
    expect(input.readOnly).toBe(true)
})

it("Props > plaintext", () => {
    render(FormTextareaVue, { props: { ...props, plaintext: true } })
    const input = screen.getByTestId(testid) as HTMLTextAreaElement

    expect(input.className).toBe("form-control")
})

it("Props > readonly & plaintext", () => {
    render(FormTextareaVue, { props: { ...props, readonly: true, plaintext: true } })
    const input = screen.getByTestId(testid) as HTMLTextAreaElement

    expect(input.className).toBe("form-control-plaintext")
    expect(input.readOnly).toBe(true)
})

it("Emit > update:modelValue", async () => {
    const comp = render(FormTextareaVue, { props })
    const updateValue = "更新\nユーザ入力"
    const emit = "update:modelValue"

    await fireEvent.update(screen.getByTestId(testid), updateValue)
    expect(comp.emitted(emit)).toBeTruthy()
    expect(comp.emitted(emit)[0]).toEqual([updateValue])
})