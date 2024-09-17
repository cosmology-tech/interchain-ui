import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, computed } from "vue";
import AnimateLayout from "../src/ui/animate-layout/animate-layout.vue";
import Box from "../src/ui/box/box.vue";
import Button from "../src/ui/button/button.vue";

const meta: Meta<typeof AnimateLayout> = {
  component: AnimateLayout,
  title: "Core/AnimateLayout",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AnimateLayout>;

export const ComplexListDemo: Story = {
  args: {},
  render: (args) => ({
    components: { AnimateLayout, Box, Button },
    setup() {
      const items = ref([
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
      ]);

      const nextId = computed(
        () => Math.max(...items.value.map((item) => item.id)) + 1,
      );

      const addItem = () => {
        items.value.push({ id: nextId.value, text: `Item ${nextId.value}` });
      };

      const removeItem = (id: number) => {
        items.value = items.value.filter((item) => item.id !== id);
      };

      const shuffleItems = () => {
        items.value = [...items.value].sort(() => Math.random() - 0.5);
      };

      return { args, items, addItem, removeItem, shuffleItems };
    },
    template: `
      <div>
        <Button @click="addItem" mr="$2">Add Item</Button>
        <Button @click="shuffleItems">Shuffle Items</Button>
        <AnimateLayout v-bind="args">
          <Box
            v-for="item in items"
            :key="item.id"
            bg="$primary"
            p="$4"
            borderRadius="$md"
            mt="$4"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>{{ item.text }}</span>
            <Button size="sm" variant="ghost" @click="() => removeItem(item.id)">Remove</Button>
          </Box>
        </AnimateLayout>
      </div>
    `,
  }),
};

export const GridLayoutDemo: Story = {
  args: {},
  render: (args) => ({
    components: { AnimateLayout, Box, Button },
    setup() {
      const items = ref([
        { id: 1, color: "#ff0000" },
        { id: 2, color: "#00ff00" },
        { id: 3, color: "#0000ff" },
        { id: 4, color: "#ffff00" },
      ]);

      const nextId = computed(
        () => Math.max(...items.value.map((item) => item.id)) + 1,
      );

      const addItem = () => {
        const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        items.value.push({ id: nextId.value, color: newColor });
      };

      const removeItem = (id: number) => {
        items.value = items.value.filter((item) => item.id !== id);
      };

      return { args, items, addItem, removeItem };
    },
    template: `
      <div>
        <Button @click="addItem" mb="$4">Add Item</Button>
        <AnimateLayout v-bind="args">
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            gap="$4"
          >
            <Box
              v-for="item in items"
              :key="item.id"
              :bg="item.color"
              height="100px"
              borderRadius="$md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              @click="() => removeItem(item.id)"
            >
              {{ item.id }}
            </Box>
          </Box>
        </AnimateLayout>
      </div>
    `,
  }),
};
