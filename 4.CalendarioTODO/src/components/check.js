export function createCheckIcon(state) {
  const checker = document.createElement("i");
  checker.dataset.ckeck_state = true;
  checker.classList.add("far", `fa-${state ? "check-" : ""}square`, "icon");
  return checker;
}