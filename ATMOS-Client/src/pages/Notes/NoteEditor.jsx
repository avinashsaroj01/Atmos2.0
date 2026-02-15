// import { RichTextEditor, Link } from "@mantine/tiptap";
// import { useEditor } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Superscript from "@tiptap/extension-superscript";
// import SubScript from "@tiptap/extension-subscript";
// import Navbar_v2 from "../../UI/Navbar_v2";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import { Modal, Group, Button } from "@mantine/core";

// let content = "";

// const NoteEditor = ({
//   selectedNote,
//   setSelectedNote,
//   setEditorOpen,
//   rerender,
//   setRerender,
// }) => {
//   let newNote = false;
//   // console.log(selectedNote);
//   if (selectedNote === null) {
//     newNote = true;
//   }

//   // console.log("checking paramssssssss in NoteEditor", params);
//   // console.log("checking paramssssssss in NoteEditor id", params.id);
//   // const [param, setParam] = useState(params.id);
//   const navigate = useNavigate();

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       SubScript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     content,
//   });
//   const backendUrl = process.env.REACT_APP_BACKEND_URL ;

//   useEffect(() => {
//     const notes = async () => {
//       const res = await fetch(
//         `${backendUrl}/note/getNote/${selectedNote}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         editor?.commands.setContent(data.note.NoteDescription);
//       } else {
//         console.log(data.message);
//       }
//     };
//     notes();
//   }, [selectedNote, editor]);

//   const handleUpdate = async () => {
//     const maincontent = editor.getHTML();
//     const maintext = editor.getText().toString();

//     const res = await fetch(
//       `${backendUrl}/note/updateNote/${selectedNote}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           NoteId: selectedNote,
//           NoteDescription: maincontent,
//           NoteText: maintext,
//           NoteOwner: null,
//           NoteUpdateAt: new Date(),
//         }),
//       }
//     );
//     const data = await res.json();
//     if (data.success) {
//       console.log(data.message);
//       editor.commands.setContent("");
//       // navigate("/notes");
//       setEditorOpen(false);
//       setSelectedNote(null);
//       setRerender(!rerender);
//     } else {
//       console.log(data.message);
//     }
//   };

//   const handleSave = async () => {
//     const maincontent = editor.getHTML();
//     const maintext = editor.getText().toString();

//     const res = await fetch(`${backendUrl}/note/create/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({
//         description: maincontent,
//         text: maintext,
//       }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       console.log(data.message);
//       editor.commands.setContent("");
//       // navigate("/notes");
//       setEditorOpen(false);
//       setSelectedNote(null);
//       setRerender(!rerender);
//     } else {
//       console.log(data.message);
//     }
//   };

//   return (
//     <>
//       {/* <Navbar_v2 activeLink={"/projects"} /> */}
//       <RichTextEditor editor={editor}>
//         <RichTextEditor.Toolbar sticky stickyOffset={60}>
//           <RichTextEditor.ControlsGroup>
//             <RichTextEditor.Bold />
//             <RichTextEditor.Italic />
//             <RichTextEditor.Underline />
//             <RichTextEditor.Strikethrough />
//             <RichTextEditor.ClearFormatting />
//             <RichTextEditor.Highlight />
//             <RichTextEditor.Code />
//           </RichTextEditor.ControlsGroup>

//           <RichTextEditor.ControlsGroup>
//             <RichTextEditor.H1 />
//             <RichTextEditor.H2 />
//             <RichTextEditor.H3 />
//             <RichTextEditor.H4 />
//           </RichTextEditor.ControlsGroup>

//           <RichTextEditor.ControlsGroup>
//             <RichTextEditor.Blockquote />
//             <RichTextEditor.Hr />
//             <RichTextEditor.BulletList />
//             <RichTextEditor.OrderedList />
//             <RichTextEditor.Subscript />
//             <RichTextEditor.Superscript />
//           </RichTextEditor.ControlsGroup>

//           <RichTextEditor.ControlsGroup>
//             <RichTextEditor.Link />
//             <RichTextEditor.Unlink />
//           </RichTextEditor.ControlsGroup>

//           <RichTextEditor.ControlsGroup>
//             <RichTextEditor.AlignLeft />
//             <RichTextEditor.AlignCenter />
//             <RichTextEditor.AlignJustify />
//             <RichTextEditor.AlignRight />
//           </RichTextEditor.ControlsGroup>
//         </RichTextEditor.Toolbar>

//         <RichTextEditor.Content />
//       </RichTextEditor>
//       <Button
//         onClick={() => {
//           {
//             newNote && handleSave();
//           }
//           {
//             newNote === false && handleUpdate();
//           }
//         }}
//         variant="default"
//         gradient={{ from: "indigo", to: "cyan" }}
//       >
//         Save
//       </Button>
//     </>
//   );
// };

// export default NoteEditor;
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoteEditor = ({
  selectedNote,
  setSelectedNote,
  setEditorOpen,
  rerender,
  setRerender,
}) => {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "", // Empty content initially
  });

  // Fetch and display note content if a note is selected
  useEffect(() => {
    const fetchNote = async () => {
      if (!selectedNote) return;
      const res = await fetch(`${backendUrl}/note/getNote/${selectedNote}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        editor?.commands.setContent(data.note.NoteDescription);
      } else {
        console.log(data.message);
      }
    };
    fetchNote();
  }, [selectedNote, editor]);

  // Handle updating an existing note
  const handleUpdate = async () => {
    const maincontent = editor.getHTML();
    const maintext = editor.getText().toString();

    const res = await fetch(`${backendUrl}/note/updateNote/${selectedNote}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        NoteId: selectedNote,
        NoteDescription: maincontent,
        NoteText: maintext,
        NoteOwner: null, // Assuming it's null, update if needed
        NoteUpdateAt: new Date(),
      }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      // Refresh the selected note state to reflect the update
      setSelectedNote(null);
      setEditorOpen(false);
      setRerender(!rerender); // Trigger a re-render
    } else {
      console.log(data.message);
    }
  };

  // Handle saving a new note
  const handleSave = async () => {
    const maincontent = editor.getHTML();
    const maintext = editor.getText().toString();

    const res = await fetch(`${backendUrl}/note/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        description: maincontent,
        text: maintext,
      }),
    });
    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      setEditorOpen(false);
      setSelectedNote(null);
      setRerender(!rerender);
    } else {
      console.log(data.message);
    }
  };

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <Button
        onClick={() => {
          if (!selectedNote) {
            handleSave(); // Save new note
          } else {
            handleUpdate(); // Update existing note
          }
        }}
        variant="default"
        gradient={{ from: "indigo", to: "cyan" }}
      >
        Save
      </Button>
    </>
  );
};

export default NoteEditor;
