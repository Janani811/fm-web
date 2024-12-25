import { MultipleSelector } from '@/components/MultipleSelector';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
// import { useAppDispatch } from '@/redux/hooks';

const CreateProblem = () => {
  const [showModal, setShowModal] = useState(false);
  //   const dispatch = useAppDispatch();

  // Close Modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Create post
  const handleExport = () => {
    // dispatch(
    //   exportCompanyPeople({
    //     companyIds,
    //     callback: () => {
    //       setShowExportModal(false);
    //     },
    //   })
    // );
  };

  // Open Modal
  const handleOpen = () => {
    setShowModal(true);
  };
  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild>
        <Button
          className='ml-auto gap-2.5 !bg-[#1a237e] px-4 py-2 text-sm font-medium'
          onClick={handleOpen}
        >
          {/* <img src={ExportIcon} alt='->' /> */}
          Post Problem
        </Button>
      </DialogTrigger>
      <DialogContent
        className='max-w-5xl rounded-lg border border-zinc-800 [&>button]:hidden'
        // onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Share Your Problem
          </DialogTitle>
          <DialogDescription className='text-sm font-normal'>
            Got a challenge? Share it with us! Fill out the form below to create
            and post your problem.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-left'>
                Title
              </Label>
              <Input
                id='name'
                value='Pedro Duarte'
                className='col-span-3'
                onChange={() => {
                  console.log('name');
                }}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-left'>
                Problem statement
              </Label>
              <Input
                id='username'
                value='@peduarte'
                className='col-span-3'
                onChange={() => {
                  console.log('username');
                }}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='tags' className='text-left'>
                Tags
              </Label>
              <div className='col-span-3 flex justify-center'>
                <MultipleSelector />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className='gap-2'>
          <Button onClick={handleClose} variant='outline'>
            Close
          </Button>
          <Button
            type='submit'
            onClick={handleExport}
            className='!bg-[#5C6BC0]'
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProblem;
