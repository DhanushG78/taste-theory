export const getRecipes = async () => {
  const response = await fetch("/api/recipes");

  if (!response.ok) {
    return [];
  }

  return response.json();
};
