import { expect, it } from "vitest"
import * as index from "../"
import FormInputCheckVue from "../FormInputCheck.vue"
import FormInputTextVue from "../FormInputText.vue"
import FormTextareaVue from "../FormTextarea.vue"
import FormSelectOptionVue from "../FormSelectOption.vue"

it("FormInputCheck", () => {
    expect(index.FormInputCheck).toEqual(FormInputCheckVue)
})

it('FormInputText', () => {
    expect(index.FormInputText).toEqual(FormInputTextVue)
})

it("FormTextarea", () => {
    expect(index.FormTextarea).toEqual(FormTextareaVue)
})

it("FormSelectOption", () => {
    expect(index.FormSelectOption).toEqual(FormSelectOptionVue)
})