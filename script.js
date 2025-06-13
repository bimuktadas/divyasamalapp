const users = {
  dibbu: "ilovebimu",
  bimu: "ilovedibbu",
};

let currentUser = null;

function login() {
  const uname = document.getElementById('username').value;
  const pw = document.getElementById('password').value;
  const error = document.getElementById('login-error');

  if (users[uname] === pw) {
    currentUser = uname;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    document.getElementById('welcome').innerText = uname === 'dibbu' ? 'Welcome, My Love ❤️' : 'Welcome, Admin';
    error.innerText = '';
  } else {
    error.innerText = 'Incorrect username or password.';
  }
}

function addJournal() {
  const title = document.getElementById('journal-title').value;
  const content = document.getElementById('journal-content').value;
  if (!title || !content) return;

  const div = document.createElement('div');
  div.innerHTML = `<strong>${title}</strong><p>${content}</p>`;
  document.getElementById('journal-list').appendChild(div);

  document.getElementById('journal-title').value = '';
  document.getElementById('journal-content').value = '';
}

function addMemory() {
  const caption = document.getElementById('memory-caption').value;
  const url = document.getElementById('memory-url').value;
  if (!caption || !url) return;

  const img = document.createElement('img');
  img.src = url;
  img.title = caption;
  document.getElementById('memory-gallery').appendChild(img);

  document.getElementById('memory-caption').value = '';
  document.getElementById('memory-url').value = '';
}

function submitTicket() {
  const msg = document.getElementById('ticket-msg').value;
  const priority = document.getElementById('priority').value;
  if (!msg.trim()) return;

  const div = document.createElement('div');
  div.innerHTML = `<p><strong>From:</strong> ${currentUser} | <strong>Priority:</strong> ${priority}</p><p>${msg}</p>`;
  document.getElementById('ticket-list').appendChild(div);

  document.getElementById('ticket-msg').value = '';
  document.getElementById('priority').value = 'Medium';
}
