<script setup lang="ts">
import SlotLayoutForm from './SlotLayoutForm.vue'
import SlotInputGroup from './SlotInputGroup.vue'

/*
 |-----------------------------------------
 |    input-group入力欄スロット
 |-----------------------------------------
 */
interface Props {
    label: string
    required?: boolean
    invalid?: string
    text?: string
    horizontal?: { label: number, input: number }
}
defineProps<Props>()
</script>

<template>
    <SlotLayoutForm :required="required" :invalid="invalid" :text="text" :horizontal="horizontal">
        <template #label>{{ label }}</template>
        <SlotInputGroup>
            <slot></slot>
        </SlotInputGroup>
    </SlotLayoutForm>
</template>