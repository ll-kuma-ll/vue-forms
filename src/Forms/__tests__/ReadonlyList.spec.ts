import { cleanup, render, screen } from "@testing-library/vue"
import { afterEach, expect, it } from "vitest"
import ReadonlyListVue from "../ReadonlyList.vue"

const choices = [
    { value: "val-1", label: "ラベル 1" },
    { value: "val-2", label: "ラベル 2" },
    { value: "val-3", label: "ラベル 3" },
]
const testid = {
    single: "form-input-text",
    multiple: "readonly-list",
}

afterEach(cleanup)

it("単一選択", () => {
    const props = {
        modelValue: choices[1].value,
        choices,
    }
    render(ReadonlyListVue, { props })
    const input = screen.getByTestId(testid.single) as HTMLInputElement

    expect(input.value).toBe(props.choices[1].label)
    expect(input.readOnly).toBe(true)
    expect(input.className).toBe("form-control-plaintext")

    expect(screen.queryByTestId(testid.multiple)).toBeFalsy()
})

it("単一選択 > size", () => {
    const props = {
        modelValue: choices[1].value,
        choices,
        size: -1,
    }
    render(ReadonlyListVue, { props })
    const input = screen.getByTestId(testid.single) as HTMLInputElement

    expect(input.className).toBe("form-control-plaintext form-control-sm")
})

it("複数選択", () => {
    const props = {
        modelValue: [choices[0].value, choices[2].value],
        choices
    }
    render(ReadonlyListVue, { props })
    const list = screen.getByTestId(testid.multiple).getElementsByTagName("li")

    expect(screen.getByTestId(testid.multiple).className).toBe("list-inline")
    expect(list.length).toBe(props.modelValue.length)

    expect(list[0].className).toBe("list-inline-item")
    expect(list[0].textContent).toBe(choices[0].label)

    expect(list[1].className).toBe("list-inline-item")
    expect(list[1].textContent).toBe(choices[2].label)
})

it("複数選択 > not inline", () => {
    const props = {
        modelValue: [choices[0].value, choices[2].value],
        choices,
        inline: false,
    }
    render(ReadonlyListVue, { props })
    const list = screen.getByTestId(testid.multiple).getElementsByTagName("li")

    expect(screen.getByTestId(testid.multiple).className).toBe("")
    expect(list.length).toBe(props.modelValue.length)

    expect(list[0].className).toBe("")
    expect(list[0].textContent).toBe(choices[0].label)

    expect(list[1].className).toBe("")
    expect(list[1].textContent).toBe(choices[2].label)
})
