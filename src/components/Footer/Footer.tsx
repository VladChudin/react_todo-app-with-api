import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
  changeFilter: (newFilter: string) => void;
  filter: string;
};

export const Footer = ({
  todos,
  clearCompleted,
  changeFilter,
  filter,
}: Props) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeCount} items left`}
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
            data-cy="FilterLinkAll"
            onClick={() => changeFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
            data-cy="FilterLinkActive"
            onClick={() => changeFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
            data-cy="FilterLinkCompleted"
            onClick={() => changeFilter('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={clearCompleted}
          disabled={!todos.some(todo => todo.completed)}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
