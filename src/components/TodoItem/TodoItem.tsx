/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  updateChecked: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, title: string) => Promise<void>;
  isLoading?: boolean;
};

export const TodoItem = ({
  todo,
  updateChecked,
  deleteTodo,
  isLoading = false,
  updateTodoTitle,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveTitle = async () => {
    const normalizedTitle = editTitle.trim();

    if (normalizedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!normalizedTitle) {
      await deleteTodo(todo.id);

      return;
    }

    setIsSaving(true);
    try {
      await updateTodoTitle(todo.id, normalizedTitle);

      setIsEditing(false);
    } catch {
      setIsEditing(true);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveTitle();
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateChecked(todo)}
          disabled={isLoading || isSaving}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={editTitle}
          onChange={event => setEditTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
          disabled={isLoading || isSaving}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isLoading || isSaving ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
