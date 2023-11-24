import { render } from "@testing-library/vue"
import FormButtonVue from "../FormButton.vue"
import { providerIconKey } from "../../keys"

const testid = "form-button"
const props = { label: "ボタンラベル" }

it("標準ボタン", () => {
    const { getByTestId } = render(FormButtonVue, { props })
    const btn = getByTestId(testid) as HTMLButtonElement

    expect(btn.type).toBe("button")
    expect(btn.className).toBe("btn btn-primary")
    expect(btn.textContent).toBe(props.label)
    expect(btn.getElementsByTagName("i")[0]).toBeFalsy()
})

it("Props > type", () => {
    const { getByTestId } = render(FormButtonVue, { props: { ...props, type: "submit" } })
    expect((getByTestId(testid) as HTMLButtonElement).type).toBe("submit")
})

it("Props > is-small", () => {
    const { getByTestId } = render(FormButtonVue, { props: { ...props, isSmall: true } })
    expect(getByTestId(testid).className).toBe("btn btn-primary btn-sm")
})

it("Props > view-type", () => {
    const { getByTestId } = render(FormButtonVue, { props: { ...props, viewType: "secondary" } })
    expect(getByTestId(testid).className).toBe("btn btn-secondary")
})

it("Props > icon", () => {
    const { getByTestId } = render(FormButtonVue, { props: { ...props, icon: "bi-icon-name" } })
    const icon = getByTestId(testid).getElementsByTagName("i")[0]
    expect(icon).toBeTruthy()
    expect(icon.className).toBe("bi bi-icon-name")
})

it("Provide > providerIcon", () => {
    const provide: { [K: symbol]: string } = {}
    provide[providerIconKey] = 'fas'
    const { getByTestId } = render(FormButtonVue, { props: { ...props, icon: "fa-icon-name" }, global: { provide } })
    expect(getByTestId(testid).getElementsByTagName("i")[0].className).toBe("fas fa-icon-name")
})
