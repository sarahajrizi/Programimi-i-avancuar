const API_URL = "http://localhost:3000/notes";

const form = document.getElementById("note-form");
const noteInput = document.getElementById("note-title");
const notesList = document.getElementById("notes-list");

async function fetchNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();
  notesList.innerHTML = "";

  if (notes.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No notes yet.";
    empty.style.color = "#999";
    notesList.appendChild(empty);
    return;
  }

  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";
    delBtn.style.background = "transparent";
    delBtn.style.border = "none";
    delBtn.style.cursor = "pointer";

    delBtn.onclick = async () => {
      await fetch(`${API_URL}/${note.id}`, { method: "DELETE" });
      fetchNotes();
    };

    li.appendChild(delBtn);
    li.classList.add("fade-in");
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: noteInput.value })
  });
  noteInput.value = "";
  fetchNotes();
});

fetchNotes();
