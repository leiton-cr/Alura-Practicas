export default class Model {
  #tasksList;

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    const tasks = localStorage.getItem("tasks");
    this.#tasksList = tasks ? JSON.parse(tasks) : [];
    this.sortTasks();
  }

  saveTask(task) {
    this.#tasksList.push(task);
    this.saveTasks();
  }

  get tasksList() {
    return this.#tasksList;
  }

  saveTasks() {
    this.sortTasks();
    localStorage.setItem("tasks", JSON.stringify(this.#tasksList));
  }

  sortTasks(){
    this.#tasksList = this.#tasksList.sort((a,b) => 
     new Date(a.date) < new Date(b.date) ? -1 : 1
    )
  }

}