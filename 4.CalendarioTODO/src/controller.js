import Model from "./model.js";
import View from "./view.js";

import { createCheckIcon } from "./components/check.js";
import { createDescription } from "./components/description.js";
import { createDeleteIcon } from "./components/delete.js";
import { uniqueDates } from "./services/date.js";

export default class Controller {
  #model = new Model();
  #view = new View();

  constructor() {
    this.loadTasks();
    this.addListeners();
  }

  addListeners() {
    this.#view.submitBtn.addEventListener("click", (e) => this.handleSubmit(e));
    this.#view.cardsList.addEventListener("click", (e) => this.handleCard(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.#view.inputField;
    const date = this.#view.dateField;
    if (!input.value || !date.value) return;

    this.#model.saveTask({
      description: input.value,
      state: false,
      date: date.value,
    });
    this.loadTasks();

    input.value = "";
    date.value = "";
  }

  handleCard(e) {
    this.handleFinish(e);
    this.handleDelete(e);
  }

  handleFinish(e) {
    if (!e.target.dataset.ckeck_state) return;
    const id = e.target.closest(".card").dataset.id;
    this.#model.tasksList[id].state = !this.#model.tasksList[id].state;
    this.updateTasks();
  }

  handleDelete(e) {
    if (!e.target.dataset.delete_state) return;
    const id = e.target.closest(".card").dataset.id;
    this.#model.tasksList.splice(id, id + 1);
    this.updateTasks();
  }

  updateTasks() {
    this.#model.saveTasks();
    this.loadTasks();
  }

  loadTasks() {
    const list = this.#model.tasksList;
    this.#view.cardsList.innerHTML = "";

    if (list.length === 0) return;

    const dates = uniqueDates(list);
    let dateIndex = 0;

    this.#view.cardsList.appendChild(this.createDateElement(dates[dateIndex]));
    list.forEach((task, index) => {
      if (dates[dateIndex] !== moment(task.date).format("DD/MM/YY")) {
      
        this.#view.cardsList.appendChild(
          this.createDateElement(dates[++dateIndex])
        );
      }

      this.#view.cardsList.appendChild(this.createCard(task, index));
    });
  }

  createCard({ date, state, description }, index) {
    const card = document.createElement("li");
    const innerContainer = document.createElement("div");

    const dateElement = document.createElement("span");

    dateElement.innerText = moment(date).format("HH:MM");
    card.classList.add("card");
    card.dataset.id = index;

    innerContainer.appendChild(createCheckIcon(state));
    innerContainer.appendChild(createDescription(description));

    card.appendChild(innerContainer);
    card.appendChild(dateElement);
    card.appendChild(createDeleteIcon());

    return card;
  }

  createDateElement(date) {
    const dateElement = document.createElement("li");
    dateElement.classList.add("date");
    dateElement.innerText = date;
    return dateElement;
  }
}