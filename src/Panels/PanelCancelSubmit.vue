<script setup lang="ts">
import { ref } from 'vue';
import FormButton from '../Forms/FormButton.vue'

/*
 |--------------------------------------------------------
 |    キャンセル・登録ボタンパネルコンポーネント
 |--------------------------------------------------------
 */

interface Props {
    labelCancel?: string
    labelSubmit?: string
    viewTypeCancel?: string
    viewTypeSubmit?: string
    iconCancel?: string
    iconSubmit?: string
}
withDefaults(defineProps<Props>(), {
    labelCancel: 'キャンセル',
    labelSubmit: '登録',
    viewTypeCancel: 'outline-secondary',
    viewTypeSubmit: 'primary'
})
const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'submit'): void
}>()

/** 登録ボタン */
const btnSubmit = ref<InstanceType<typeof FormButton> | null>(null)

/**
 * 登録ボタン有効化
 */
function unDisable() {
    btnSubmit.value?.unDisable()
}

/**
 * 登録ボタン無効化
 */
function disable() {
    btnSubmit.value?.disable()
}

/**
 * 登録イベント発火
 */
function fireSubmit() {
    disable()
    emit('submit')
}

defineExpose({ unDisable, disable })
</script>

<template>
    <div class="panel-cancel-submit" data-testid="panel-cancel-submit">
        <FormButton
            :label="labelCancel"
            :view-type="viewTypeCancel"
            :is-small="true"
            :icon="iconCancel"
            testid="btn-cancel"
            @click="$emit('cancel')"
        />
        <FormButton
            ref="btnSubmit"
            :label="labelSubmit"
            :view-type="viewTypeSubmit"
            :icon="iconSubmit"
            testid="btn-submit"
            @click="fireSubmit"
        />
    </div>
</template>