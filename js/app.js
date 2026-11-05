// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#todo-form');
  let input = document.querySelector('#todo-input');
  let errorMsg = document.querySelector('#error-msg');
  let list = document.querySelector('#todo-list');
  let counter = document.querySelector('#counter');
  let allBtn = document.querySelector('#filter-all');
  let activeBtn = document.querySelector('#filter-active');
  let doneBtn = document.querySelector('#filter-done');

  let currentFilter = 'all';

  function addItem(e) {
    e.preventDefault();
    let text = input.value.trim();

    if (text == '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = text;

    let del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    input.value = '';
    update();
  }

  function handleListClick(e) {
    if (e.target == list) return;

    let li;
    if (e.target.parentNode == list) {
      li = e.target;
    } else {
      li = e.target.parentNode;
    }

    if (e.target.classList.contains('delete-btn')) {
      list.removeChild(li);
    } else {
      li.classList.toggle('completed');
    }
    update();
  }

  function handleFilter(e) {
    if (e.target.id == 'filter-active') {
      currentFilter = 'active';
    } else if (e.target.id == 'filter-done') {
      currentFilter = 'done';
    } else {
      currentFilter = 'all';
    }
    update();
  }

  function update() {
    let left = 0;

    for (let li of list.children) {
      let completed = li.classList.contains('completed');
      if (!completed) {
        left++;
      }

      let show = true;
      if (currentFilter == 'active' && completed) {
        show = false;
      }
      if (currentFilter == 'done' && !completed) {
        show = false;
      }

      if (show) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }

    if (left == 1) {
      counter.textContent = left + ' item left';
    } else {
      counter.textContent = left + ' items left';
    }
  }

  form.addEventListener('submit', addItem);
  list.addEventListener('click', handleListClick);
  allBtn.addEventListener('click', handleFilter);
  activeBtn.addEventListener('click', handleFilter);
  doneBtn.addEventListener('click', handleFilter);

  update();
});