export function createDescription(data) {
  const description = document.createElement("span");
  description.classList.add("task");
  description.innerText = data;
  return description;
}