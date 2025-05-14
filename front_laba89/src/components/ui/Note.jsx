import axios from "axios";

export const fetchNotes = async (filter) => {
    try {
      const response = await axios.get("https://localhost:7129/notes", {
        params: {
          search: filter?.search,
          sort: filter?.sortItem,    
          order: filter?.sortOrder,  
        },
      });
      return response.data.notes;
    } catch (e) {
      console.error("Ошибка при загрузке:", e);
      return [];
    }
  };

export const createNote = async (note) => {
  try {
    const response = await axios.post("https://localhost:7129/notes", note);
    return response.data; 
  } catch (e) {
    console.error("Ошибка при создании заметки:", e);
    throw e; 
  }
};