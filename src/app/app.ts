export const getCanvasEl = (id: string) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error(`Canvas with specified id ${id} not found.`);
  }

  return canvas;
};
