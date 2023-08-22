import { expect, it } from "vitest"
import * as index from "../"
import FormInputTextVue from "../FormInputText.vue"
import FormTextareaVue from "../FormTextarea.vue"

it('FormInputText', () => {
    expect(index.FormInputText).toEqual(FormInputTextVue)
})

it("FormTextarea", () => {
    expect(index.FormTextarea).toEqual(FormTextareaVue)
})