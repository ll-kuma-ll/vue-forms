import { fireEvent, render } from "@testing-library/vue"
import PanelCancelSubmitVue from "../PanelCancelSubmit.vue"
import { providerIconKey } from "../../keys"

const testid = {
    root: "panel-cancel-submit",
    cancel: "btn-cancel",
    submit: "btn-submit",
}
const btnSm = "btn-sm"

describe("標準", () => {
    it("cancelボタン", () => {
        const { getByTestId } = render(PanelCancelSubmitVue)
        const cancel = getByTestId(testid.cancel) as HTMLButtonElement
        const icon = cancel.getElementsByTagName("i")[0]

        expect(cancel.type).toBe("button")
        expect(cancel.classList.contains("btn-outline-secondary")).toBe(true)
        expect(cancel.classList.contains(btnSm)).toBe(true)
        expect(cancel.textContent).toBe("キャンセル")

        expect(icon).toBeFalsy()
    })

    it("submitボタン", () => {
        const { getByTestId } = render(PanelCancelSubmitVue)
        const submit = getByTestId(testid.submit) as HTMLButtonElement
        const icon = submit.getElementsByTagName("i")[0]

        expect(submit.type).toBe("button")
        expect(submit.classList.contains("btn-primary")).toBe(true)
        expect(submit.classList.contains(btnSm)).toBe(false)
        expect(submit.textContent).toBe("登録")

        expect(icon).toBeFalsy()
    })

    it('カスタマイズ', () => {
        const opts = {
            props: {
                labelCancel: "CANCEL",
                labelSubmit: "SUBMIT",
                viewTypeCancel: "warning",
                viewTypeSubmit: "success",
                iconCancel: "fas-icon-cancel",
                iconSubmit: "fas-icon-submit",
            },
            global: { provide: {} as { [K: symbol]: string } }
        }
        opts.global.provide[providerIconKey] = 'fas'
        const { getByTestId } = render(PanelCancelSubmitVue, opts)
        const cancel = getByTestId(testid.cancel)
        const submit = getByTestId(testid.submit)

        let icon = cancel.getElementsByClassName('fas')[0]
        expect(cancel.classList.contains(`btn-${opts.props.viewTypeCancel}`)).toBe(true)
        expect(cancel.textContent).toBe(opts.props.labelCancel)
        expect(icon).toBeTruthy()
        expect(icon.classList.contains(opts.global.provide[providerIconKey])).toBe(true)
        expect(icon.classList.contains(opts.props.iconCancel)).toBe(true)

        icon = submit.getElementsByClassName('fas')[0]
        expect(submit.classList.contains(`btn-${opts.props.viewTypeSubmit}`)).toBe(true)
        expect(submit.textContent).toBe(opts.props.labelSubmit)
        expect(icon).toBeTruthy()
        expect(icon.classList.contains(opts.global.provide[providerIconKey])).toBe(true)
        expect(icon.classList.contains(opts.props.iconSubmit)).toBe(true)
    })

    it('クリックイベント', async () => {
        const { getByTestId, emitted } = render(PanelCancelSubmitVue)
        const cancel = getByTestId(testid.cancel)
        const submit = getByTestId(testid.submit)

        await fireEvent.click(cancel)
        expect(emitted('cancel')).toBeTruthy()

        await fireEvent.click(submit)
        expect(emitted('submit')).toBeTruthy()
    })
})