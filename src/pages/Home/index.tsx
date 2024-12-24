import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

export const Home = () => {
  // const [editorContent, setEditorContent] = useState(null);

  const editor = useCreateBlockNote();

  return (
    <div className='mt-6 flex w-full flex-col items-center justify-center'>
      <div className='text-2xl'>Welcome to FixMate APP</div>
      <BlockNoteView
        editor={editor}
        sideMenu={false}
        className='hidden h-[300px] w-8/12'
      >
        <SideMenuController
          sideMenu={(props) => (
            <SideMenu {...props}>
              Button which removes the hovered block.
              {/* <RemoveBlockButton {...props} /> */}
              <DragHandleButton {...props} />
            </SideMenu>
          )}
        />
      </BlockNoteView>
      {/* <button onClick={handleSave}>Save</button> */}
    </div>
  );
};
