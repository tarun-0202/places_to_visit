(function(){
  emailjs.init("tiX92OaTTg3Q-II7H");
})();
document.getElementById('suggestionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var templateParams = {
    from_name: document.getElementById('userName').value,
    from_email: document.getElementById('userEmail').value,
    suggestion: document.getElementById('placeName').value,
    to_email: 'scs246319@gmail.com'
  };
  emailjs.send('service_86644gm', 'template_arclcwa', templateParams)
  .then(function(response) {
    document.getElementById('thankYouMsg').textContent = "Thank you for your suggestion!";
    document.getElementById('thankYouMsg').style.display = "block";
    document.getElementById('suggestionForm').reset();
  },
  function(error) {
    alert('Failed to send suggestion. Please try again later.');
  });
});
function alertVisit(placeName) {
  alert("Thank you for visiting " + placeName + "!");
}
function openVideo(url) {
  window.open(url, '_blank');
}
function toggleWatchlist() {
  const panel = document.getElementById('watchlistPanel');
  panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'block' : 'none';
  updateEmptyState();
}
if(Array.from(list.children).length === 0) {
  const emptyMsg = document.createElement("li");
  emptyMsg.id = "emptyWatchlistMsg";
  emptyMsg.textContent = "No places added yet.";
  emptyMsg.style.fontStyle = "italic";
  emptyMsg.style.color = "#555";
  list.appendChild(emptyMsg);
}
function addToVisit(button) {
  const card = button.closest('.card');
  const placeName = card.getAttribute('data-name');
  const list = document.getElementById("watchlistItems");
  const exists = Array.from(list.children).find(li => li.dataset.name === placeName);
  if (!exists) {
    const li = document.createElement("li");
    li.dataset.name = placeName;
    li.innerHTML = `${placeName} <button onclick="removeFromList(this)">X</button>`;
    list.appendChild(li);
    button.textContent = "❌Remove from Places to Visit";
    button.onclick = () => removeFromVisit(button);
  }
  updateEmptyState();
}
function removeFromVisit(button) {
  const card = button.closest('.card');
  const placeName = card.getAttribute('data-name');
  const list = document.getElementById("watchlistItems");
  const items = Array.from(list.children);
  items.forEach(li => {
    if (li.dataset.name === placeName) {
      list.removeChild(li);
    }
  });
  button.textContent = "✅Add to Places to Visit";
  button.onclick = () => addToVisit(button);
  updateEmptyState();
}
function removeFromList(btn) {
  const li = btn.parentElement;
  const placeName = li.dataset.name;
  li.remove();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.getAttribute('data-name') === placeName) {
      const buttons = card.querySelectorAll('button');
      buttons.forEach(b => {
        if (b.textContent.includes("Remove from Places to Visit")) {
          b.textContent = "✅Add to Places to Visit";
          b.onclick = () => addToVisit(b);
        }
      });
    }
  });
  updateEmptyState();
}
function updateEmptyState() {
  const list = document.getElementById("watchlistItems");
  const emptyMsg = document.getElementById("emptyWatchlistMsg");
  if (list.children.length === 0) {
    if (!emptyMsg) {
      const msg = document.createElement("li");
      msg.id = "emptyWatchlistMsg";
      msg.textContent = "No places added yet.";
      msg.style.fontStyle = "italic";
      msg.style.color = "#555";
      list.appendChild(msg);
    }
  }else if (emptyMsg) {
    list.removeChild(emptyMsg);
  }
}
window.onload = updateEmptyState;