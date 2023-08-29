<script setup lang="ts">
import { computed } from 'vue';
import FormSelectOption from '../Forms/FormSelectOption.vue';
import SlotLayoutForm from '../Slots/SlotLayoutForm.vue';

/*
 |---------------------------------------------
 |    プルダウン選択入力欄コンポーネント
 |---------------------------------------------
 */
type Model = string | number | string[] | number[] | null
interface Props {
    modelValue: Model
    choices: { value: number | string | null, label: string }[]
    label: string
    required?: boolean
    disabled?: boolean
    invalid?: string
    text?: string
    horizontal?: { label: number, input: number }
}
const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: Model): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <SlotLayoutForm :required="required" :invalid="invalid" :text="text" :horizontal="horizontal">
        <template #label>{{ label }}</template>
        <FormSelectOption v-model="value" :choices="choices" :disabled="disabled" :invalid="invalid "/>
    </SlotLayoutForm>
</template>