import classNames from 'classnames';

type Props = {
  title: string;
  className?: string;
  onClick?: (title: any) => void;
  variant?: 'light' | 'dark';
};

export function Button({ title, className, variant = 'dark', onClick }: Props) {
  return (
    <button className={classNames([
      'bg-evergreenLight px-6 py-3 rounded-lg shadow  font-medium mt-3',
      variant === 'dark' &&
      'bg-evergreenLight text-white',
      variant === 'light' &&
      'bg-white border-2 border-evergreenLight text-evergreenLight',
      className,
    ])}
    onClick = {onClick}>
      {title}
    </button>
  );
};