import Editor from '@/components/Editor';

export const Home = () => {
  return (
    <div className='mt-6 flex w-full flex-col items-center justify-center'>
      <div className='mb-5 text-2xl'>Welcome to FixMate APP</div>
      <div className='w-7/12'>
        <Editor
          onChange={(value) => {
            console.log(value);
          }}
          editable
        />
      </div>
    </div>
  );
};
