import { useState, useEffect } from 'react';
import { fetchNotes, createNote } from "./services/notes"; 
import CreateNoteForm from "./components/ui/CreateNoteForm";
import Filters from "./components/ui/Filters";
import Note from "./components/ui/Note";
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotes(filter);
        if (process.env.NODE_ENV === 'development') { 
          console.log("Данные загружены:", data); 
        }
        setNotes(data || []);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };
    fetchData();
  }, [filter]);


  const onCreate = async (newNote) => {
    try {
      const createdNote = await createNote(newNote); 
      setNotes(prevNotes => [createdNote, ...prevNotes]); 
    } catch (error) {
      console.error("Ошибка создания:", error);
    }
  };

  return (
    <section className="p-8 flex flex-row justify-start items-start gap-12">
      <div className="flex flex-col w-1/3 gap-10">
        <CreateNoteForm onCreate={onCreate} />
        <Filters filter={filter} setFilter={setFilter} />
      </div>
      <ul className="flex flex-col gap-5 w-1/2">
        {notes.map((note) => (
          <li key={note.id}>
            <Note note={note} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;