export function createDeleteIcon() {
  const deleater = document.createElement("i");
  deleater.dataset.delete_state = true;
  deleater.classList.add("fas", "fa-trash-alt", "trashIcon", "icon");
  return deleater;
}