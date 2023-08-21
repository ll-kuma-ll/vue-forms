import { expect, it } from "vitest"
import * as index from "../"
import FormInputTextVue from "../FormInputText.vue"

it('1行文字列入力コンポーネント', () => {
    expect(index.FormInputText).toEqual(FormInputTextVue)
})