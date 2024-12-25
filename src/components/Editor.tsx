import { useCallback, useState } from 'react';
import { PartialBlock } from '@blocknote/core';
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;
  const [blocks, setBlocks] = useState<PartialBlock[]>(initialBlocks);
  const editor = useCreateBlockNote({ initialContent: blocks });

  const emitValue = useCallback(() => {
    if (onChange) {
      setBlocks(editor.document);
      setTimeout(() => {
        onChange(JSON.stringify(blocks));
      }, 1000);
    }
  }, [blocks, editor.document, onChange]);

  return (
    <div className='size-full'>
      <BlockNoteView
        className='min-h-16'
        // theme='light'
        editable={editable}
        editor={editor}
        sideMenu={true}
        onChange={emitValue}
      >
        <SideMenuController
          sideMenu={(props) => (
            <SideMenu {...props}>
              <DragHandleButton {...props} />
            </SideMenu>
          )}
        />
      </BlockNoteView>
    </div>
  );
}
