<script setup lang="ts">
import { computed } from 'vue';
import SlotLayoutForm from '../Slots/SlotLayoutForm.vue'
import FormTextarea from '../Forms/FormTextarea.vue';

/*
 |-----------------------------------------
 |    複数行テキスト入力欄コンポーネント
 |-----------------------------------------
 */
interface Props {
    modelValue: string | null
    label: string
    required?: boolean
    placeholder?: string
    disabled?: boolean
    size?: -1 | 0 | 1
    invalid?: string
    text?: string
    horizontal?: { label: number, input: number }
    readonly?: boolean
    plaintext?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: value => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <SlotLayoutForm :required="required" :invalid="invalid" :text="text" :horizontal="horizontal">
        <template #label>{{ label }}</template>
        <FormTextarea
            v-model="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :size="size"
            :invalid="invalid"
            :readonly="readonly"
            :plaintext="plaintext"
        />
    </SlotLayoutForm>
</template>