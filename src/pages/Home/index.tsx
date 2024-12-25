import CreateProblem from './CreateProblem';

export const Home = () => {
  return (
    <div className='mt-6 flex w-full items-center justify-center'>
      <div className='flex w-10/12 items-center justify-between'>
        <div>Home page </div>
        <CreateProblem />
      </div>
    </div>
  );
};
