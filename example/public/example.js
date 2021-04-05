function myFunction() {
  const navBarList = document.getElementById('navbar-list');
  const a = document.createElement('a');
  a.textContent = 'google';
  a.setAttribute('href', 'https://www.google.com');

  const li = document.createElement('li');
  li.appendChild(a);
  navBarList.appendChild(li);
}

myFunction();
