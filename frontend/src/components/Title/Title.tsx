import classNames from 'classnames';

type Props = {
  title: string;
  className?: string;
};

export function Title ({title, className}: Props) {
  return (
    <div className={classNames([
      'text-2xl md:text-5xl border-b-4 border-b-evergreen-light w-fit font-bold text-evergreen',
      className,
    ])}>
      {title}
    </div>
  );
};