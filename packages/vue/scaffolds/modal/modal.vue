<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Dialog } from "@ark-ui/vue";
import * as styles from "./modal.css";

interface ModalProps {
  isOpen?: boolean;
  initialOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  initialFocusRef?: HTMLElement | null;
  renderTrigger?: (props: any) => any;
  header: any;
  closeOnClickaway?: boolean;
  preventScroll?: boolean;
  role?: "dialog" | "alertdialog";
  root?: HTMLElement | null;
  className?: string;
  themeClassName?: string;
  contentStyles?: Record<string, string>;
  contentClassName?: string;
  backdropClassName?: string;
  childrenClassName?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: undefined,
  initialOpen: false,
  closeOnClickaway: true,
  preventScroll: true,
  role: "dialog",
});

const emit = defineEmits(["update:isOpen"]);

const defaultRoot = ref<HTMLElement | null>(null);
const open = ref(props.isOpen ?? props.initialOpen);

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue !== undefined) {
      open.value = newValue;
    }
  },
);

watch(open, (newValue) => {
  emit("update:isOpen", newValue);
  if (newValue) {
    props.onOpen?.();
  } else {
    props.onClose?.();
  }
});

onMounted(() => {
  if (!props.root) {
    defaultRoot.value = document.body;
  }
});

const onOpenChange = (details: { open: boolean }) => {
  open.value = details.open;
};

const onCloseButtonClick = () => {
  open.value = false;
};

const clickAwayHandler = (event: MouseEvent) => {
  if (
    props.closeOnClickaway &&
    event.target instanceof Node &&
    event.currentTarget instanceof Node &&
    !event.currentTarget.contains(event.target)
  ) {
    open.value = false;
  }
};
</script>

<template>
  <Dialog.Root :open="open" @openChange="onOpenChange">
    <template v-if="renderTrigger" #trigger="slotProps">
      <Dialog.Trigger v-bind="slotProps">
        {{ renderTrigger(slotProps) }}
      </Dialog.Trigger>
    </template>

    <Dialog.Backdrop
      :class="[styles.modalBackdrop, backdropClassName, themeClassName]"
      data-testid="modal-backdrop"
    />
    <Dialog.Positioner
      :class="[styles.modalRoot, themeClassName]"
      @click="clickAwayHandler"
    >
      <Dialog.Content
        :class="[styles.modalContainer, className]"
        :style="{
          position: 'relative',
          zIndex: 999,
        }"
      >
        <div
          :class="[styles.modalContent, contentClassName]"
          :style="contentStyles"
          data-modal-part="content"
        >
          <component
            :is="header"
            :closeButtonProps="{
              onClick: onCloseButtonClick,
            }"
          />

          <div :class="childrenClassName" data-modal-part="children">
            <slot></slot>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
