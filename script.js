function addMemory() {
  const caption = document.getElementById('memory-caption').value;
  const url = document.getElementById('memory-url').value;
  if (!caption || !url) return;
  const container = document.getElementById('memory-gallery');
  const div = document.createElement('div');
  div.innerHTML = `<img src="${url}" style="width:100%; height:150px; object-fit:cover"/><p>${caption}</p>`;
  container.appendChild(div);
}