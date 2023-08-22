import { expect, it } from "vitest"
import * as index from "../"
import FormInputTextVue from "../FormInputText.vue"

it('FormInputText', () => {
    expect(index.FormInputText).toEqual(FormInputTextVue)
})