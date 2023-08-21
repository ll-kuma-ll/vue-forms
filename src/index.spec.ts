import { expect, it } from "vitest"
import * as index from "./"
import * as forms from "./Forms"

it('FormInputText', () => {
    expect(index.FormInputText).toEqual(forms.FormInputText)
})