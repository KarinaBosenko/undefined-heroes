let selectedFurniture = null; // обрана картка меблів
let selectedColor = null; // обраний маркер кольору

export function setSelectedFurniture(data) {
  selectedFurniture = data;
}

export function getSelectedFurniture() {
  return selectedFurniture;
}

export function setSelectedColor(color) {
  selectedColor = color;
}

export function getSelectedColor() {
  return selectedColor;
}

export function resetSelection() {
  selectedFurniture = null;
  selectedColor = null;
}
