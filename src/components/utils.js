let uuid = 3;

export function generateBoxes() {
  const items = [];

    const id = uuid++;
    const title = "email" + id

    items.push({ id, title });

  return items;
}

export function generateItems() {
  const items = [];

    const color = "blue"
    const width = 2
    const height = 2
    const id = uuid++;
    const title = id

    items.push({ id, color, width, height, title });

  return items;
}


export const options = {
  dragSortHeuristics: {
    sortInterval: 70
  },
  layoutDuration: 400,
  dragRelease: {
    duration: 400,
    easing: "ease-out"
  },
  dragEnabled: true,
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    createElement: function(item) {
      // The element will have the Css class ".muuri-item-placeholder".
      return item.getElement().cloneNode(true);
    }
  }
};
