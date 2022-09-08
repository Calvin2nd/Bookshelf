document.addEventListener('DOMContentLoaded', function () {

    const completeBookshelfList = [];
    const RENDER_EVENT = 'render-toread';
  
    const submitForm = document.getElementById('inputbook');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addToread();
    });
  
    function addToread() {
      const titleBook = document.getElementById('inputBookTitle').value;
      const authorBook = document.getElementById('inputBookAuthor').value;
      const yearBook = document.getElementById('inputBookYear').value;
    
         
      const generatedID = generateId();
      const toreadObject = generateToreadObject(generatedID, titleBook, authorBook, yearBook, false);
      completeBookshelfList.push(toreadObject);
         
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  
    function generateId() {
      return +new Date();
    }
         
    function generateToreadObject(id, titleBook, authorBook, yearBook, isCompleted) {
      return {
        id,
        titleBook,
        authorBook,
        yearBook,
        isCompleted
      }
    }
  
    document.addEventListener(RENDER_EVENT, function () {
      const uncompletedTOREADList = document.getElementById('incompleteBookshelfList');
      uncompletedTOREADList.innerHTML = '';
         
      const completedTOREADList = document.getElementById('completeBookshelfList');
      completedTOREADList.innerHTML = '';
         
      for (const toreadItem of completeBookshelfList) {
        const toreadElement = makeToread(toreadItem);
        if (!toreadItem.isCompleted)
          uncompletedTOREADList.append(toreadElement);
        else
          completedTOREADList.append(toreadElement);
      }
    });
  
    function makeToread(toreadObject) {
      const textTitleBook = document.createElement('h3');
      textTitleBook.innerText = toreadObject.titleBook;
         
      const textAuthorBook = document.createElement('p');
      textAuthorBook.innerText = toreadObject.authorBook;

      const textYearBook = document.createElement('p');
      textYearBook.innerText = toreadObject.yearBook;
         
      const textbook_list = document.createElement('article');
      textbook_list.classList.add('inner');
      textbook_list.append(textTitleBook, textAuthorBook, textYearBook);
         
      const book_list = document.createElement('article');
      book_list.classList.add('item', 'shadow');
      book_list.append(textbook_list);
      book_list.setAttribute('id', `toread-${toreadObject.id}`);
  
      if (toreadObject.isCompleted) {
        const doneButton = document.createElement('button');
        doneButton.classList.add('done-button');
        doneButton.innerText = "Sudah Selesai Baca"
              
        doneButton.addEventListener('click', function () {
          addReadToCompleted(toreadObject.id);
        });
              
        container.append(doneButton);
           
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
           
        trashButton.addEventListener('click', function () {
          removeTaskFromCompleted(todoObject.id);
        });
           
        container.append(undoButton, trashButton);
      } 
      else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
              
        checkButton.addEventListener('click', function () {
          addTaskToCompleted(todoObject.id);
        });
              
        container.append(checkButton);
      }
         
      return container;
    }
  
  
    function addReadToCompleted (toreadId) {
      const toreadTarget = findToread(toreadId);
         
      if (todoTarget == null) return;
         
      todoTarget.isCompleted = true;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  
    function findTodo(todoId) {
      for (const todoItem of todos) {
        if (todoItem.id === todoId) {
          return todoItem;
        }
      }
      return null;
    }
  
    function removeTaskFromCompleted(todoId) {
      const todoTarget = findTodoIndex(todoId);
         
      if (todoTarget === -1) return;
         
      todos.splice(todoTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
         
         
    function undoTaskFromCompleted(todoId) {
      const todoTarget = findTodo(todoId);
         
      if (todoTarget == null) return;
         
      todoTarget.isCompleted = false;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  
    function findTodoIndex(todoId) {
      for (const index in todos) {
        if (todos[index].id === todoId) {
          return index;
        }
      }
         
      return -1;
    }
  
    function loadDataFromStorage() {
      const serializedData = localStorage.getItem(STORAGE_KEY);
      let data = JSON.parse(serializedData);
     
      if (data !== null) {
        for (const todo of data) {
          todos.push(todo);
        }
      }
     
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  
    document.addEventListener('DOMContentLoaded', function () {
      // ...
      if (isStorageExist()) {
        loadDataFromStorage();
      }
    });
});
