import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
  changeFilter: (newFilter: string) => void;
  filter: string;
};

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
  selected = 'selected',
}

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
            className={classNames('filter__link', {
              selected: filter === FilterType.all,
            })}
            data-cy="FilterLinkAll"
            onClick={() => changeFilter(FilterType.all)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === FilterType.active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => changeFilter(FilterType.active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === FilterType.completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => changeFilter(FilterType.completed)}
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
