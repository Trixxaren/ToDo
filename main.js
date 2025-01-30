// class för beskrivning av todonn
class Task { 
    constructor(description) {
        this.description = description; // spara beskrivningen i todon
    }
}
// class för att hantera alla todos
class TaskManager {
    constructor() {
        this.activeTasks = []; // lista för input på aktiva todos
        this.completedTasks = []; //lista för input på färdiga todos
    }
// lägg till ny todo
    addNewTask(description) { 
        const errorMessageDiv = document.getElementById('errorMessage'); // error om det är tomt
        if (description.trim()) { // trim tar bort alla onödiga mellanslag
            const newTask = new Task(description); // skapa todo
            this.activeTasks.push(newTask); // pushar till aktiva task först
            errorMessageDiv.innerText = ''; // tar bort ev felmeddelande
            this.renderActiveTaskList(); // tar fram aktiva todo listan
        } else { 
            errorMessageDiv.innerText = 'Error: ToDo får inte vara tom!';
        }
    }
// aktiva todos
    renderActiveTaskList() {
        const activeList = document.getElementById('activeTaskList'); 
        activeList.innerHTML = '';
        const activeTaskMessage = document.getElementById('activeTaskMessage'); // Om det inte finns några aktiva todos
        if (this.activeTasks.length === 0) { 
            activeTaskMessage.innerText = 'Inga aktiva ToDos, sluta slöa!'; 
        } else { 
            activeTaskMessage.innerText = ''; 
            this.activeTasks.forEach((task, index) => { // Går igenom varje aktiv todo och visar den
                const taskDiv = this.createTaskElement(task, index, 'active'); // skapas todon
                activeList.appendChild(taskDiv); // lägger till "barn" i aktiva listan
            });
        }
    }
// färdiga todos
    renderCompletedTaskList() {
        const completedList = document.getElementById('completedTaskList');
        completedList.innerHTML = ''; 
        const completedTaskMessage = document.getElementById('completedTaskMessage');
 // Inga färdiga todos
        if (this.completedTasks.length === 0) {
            completedTaskMessage.innerText = 'Inga färdiga ToDos, börja jobba förfan!';
        } else {
            completedTaskMessage.innerText = ''; 
            this.completedTasks.forEach((task, index) => { // Går igenom varje färdig todo och visar
                const taskDiv = this.createTaskElement(task, index, 'completed');
                completedList.appendChild(taskDiv); // lägger till "barn" i färdiga
             });
        }
    }

    createTaskElement(task, index, status) {
        const taskDiv = document.createElement('div'); 
        taskDiv.className = 'task'; 
        taskDiv.innerText = task.description; 
        const editButton = document.createElement('button'); 
        editButton.innerText = 'Ändra';
        editButton.onclick = () => this.editTask(index, status);

        taskDiv.appendChild(editButton); 
        if (status === 'active') {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'klar';
            completeButton.onclick = () => this.markTaskAsComplete(index); 
            taskDiv.appendChild(completeButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Radera';
        deleteButton.onclick = () => this.deleteTask(index, status); 
        taskDiv.appendChild(deleteButton);

        return taskDiv;
    }
// ändra knappen
    editTask(index, status) {
        const taskList = status === 'active' ? this.activeTasks : this.completedTasks; // väljer vilken lista aktiva/färdiga
        const taskDivs = status === 'active' ? document.getElementById('activeTaskList').getElementsByClassName('task') : document.getElementById('completedTaskList').getElementsByClassName('task');
        const taskDiv = taskDivs[index]; // Hämtar diven för todon
        this.createEditInputField(taskDiv, index, status, taskList[index].description); // Skapar input för att ändra
    }
    
    createEditInputField(taskDiv, index, status, currentDescription) {
        const buttons = taskDiv.getElementsByTagName('button'); 
        while (buttons.length > 0) {
            buttons[0].remove(); // Tar bort knapparna
        } 
    
        const input = document.createElement('input');
        input.type = 'text'; 
        input.value = currentDescription; // value till nuvarande beskrvning
        taskDiv.appendChild(input); // Adderar input "barnet"
        const errorMessageDiv = document.getElementById('errorMessage');
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Spara';
        saveButton.onclick = () => {
            const newDescription = input.value; // hämtar nya value 
            if (newDescription) {  // Om de finns något nytt
                const taskList = status === 'active' ? this.activeTasks : this.completedTasks;  // väljer vilken lista aktiva/färdiga
                taskList[index].description = newDescription; // Uppdaterar todon
                this.renderActiveTaskList(); 
                this.renderCompletedTaskList(); 
                taskDiv.removeChild(input); 
                taskDiv.removeChild(saveButton); 
            } else {
                errorMessageDiv.innerText = 'Error: ToDo får inte vara tom!';
            }
        };
        taskDiv.appendChild(saveButton);
    }

    markTaskAsComplete(index) { 
        const completedTask = this.activeTasks.splice(index, 1)[0]; // Tar bort todo från aktiva och sparar den
        this.completedTasks.push(completedTask); // Lägger till todo i listan över färdiga uppgifter
        this.renderActiveTaskList(); // Visar uppdaterad lista över aktiva todo
        this.renderCompletedTaskList(); // Visar uppdaterad lista över todo
    }

    deleteTask(index, status) {
        if (status === 'active') {
            this.activeTasks.splice(index, 1); // Tar bort från aktiva todo
            this.renderActiveTaskList();
        } else {
            this.completedTasks.splice(index, 1); // Tar bort från färdiga todo
            this.renderCompletedTaskList(); // Visar uppdaterad lista över todo
        }
    }

    resetTasks() {
        this.activeTasks = [];  // Tömmer listan på aktiva
        this.completedTasks = [];// Tömmer listan på färdiga
        this.renderActiveTaskList(); // Tar fram tom lista 
        this.renderCompletedTaskList(); // tar fram tom lista
    }
}

const taskManager = new TaskManager();
function addNewTask() {
    const description = document.getElementById('taskDescription').value; // tar fram value från input
    taskManager.addNewTask(description); // lägger till todo
    document.getElementById('taskDescription').value = '';  
} 

function resetAllTasks() { 
    taskManager.resetTasks(); 
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.innerText = ''; 
}

const resetButton = document.getElementById('resetButton');
resetButton.onclick = resetAllTasks; 



