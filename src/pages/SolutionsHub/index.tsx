import Editor from '@/components/Editor';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProblems, problemSelector } from '@/redux/slices/errorSlice';
import { useEffect } from 'react';

const SolutionsHub = () => {
  const dispatch = useAppDispatch();
  const { problemList } = useAppSelector(problemSelector);
  useEffect(() => {
    dispatch(getProblems());
  }, []);
  return (
    <div className='mt-6 flex w-full flex-col items-center justify-center'>
      <div className='flex w-7/12 flex-col gap-4'>
        {!!problemList?.length &&
          problemList.map((item) => (
            <div className='flex flex-col gap-2 rounded bg-white p-4'>
              <div className='flex gap-2 text-sm font-semibold'>
                <div> Title:</div>
                <div className='font-normal'>{item.er_title}</div>
              </div>
              <div className='text-sm font-semibold'>Problem and Solution:</div>
              <Editor
                onChange={(value) => {
                  console.log(value);
                }}
                editable
                initialContent={item.er_description}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SolutionsHub;
