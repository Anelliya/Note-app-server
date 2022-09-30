enum Status {
  Active = 'active',
  Archived = 'archived',
}

enum Category {
  Task = 'Task',
  Idea = 'Idea',
  RandomThought = 'Random Thought',
}

class Note {
  id: string;
  created: number;
  status: string;
  name: string;
  content: string;
  category: string;
  dates: string;
}

export { Status, Category, Note };
