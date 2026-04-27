import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecipeCard } from "./RecipeCard";

const meta = {
  title: "Sahani/RecipeCard",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "recipe-1",
    name: "Kenyan Pilau Rice",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    calories: 450,
    rating: 4.8,
    isFavorite: false,
    onFavoriteToggle: (id) => console.log('Toggle favorite:', id),
  },
};

export const Favorited: Story = {
  args: {
    id: "recipe-2",
    name: "Ugali with Sukuma Wiki",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    calories: 320,
    rating: 4.9,
    isFavorite: true,
    onFavoriteToggle: (id) => console.log('Toggle favorite:', id),
  },
};

export const WithoutImage: Story = {
  args: {
    id: "recipe-3",
    name: "Chapati",
    calories: 280,
    rating: 4.5,
    isFavorite: false,
    onFavoriteToggle: (id) => console.log('Toggle favorite:', id),
  },
};
