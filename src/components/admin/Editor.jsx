"use client";

import React, { useEffect, useRef, useState } from "react";

// Custom Upload Adapter for CKEditor
class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => this._initRequest(file));
  }

  abort() {
    // Handle abort if needed
  }

  _initRequest(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("upload", file);

      fetch("/api/blogs/upload-image", {
        method: "POST",
        body: formData,
        credentials: "include", // Include cookies for auth
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.error?.message || "Upload failed");
            });
          }
          return response.json();
        })
        .then((result) => {
          if (result.url) {
            resolve({
              default: result.url,
            });
          } else {
            reject(new Error("Upload failed: No URL in response"));
          }
        })
        .catch((error) => {
          console.error("Upload error:", error);
          reject(error);
        });
    });
  }
}

// Upload adapter factory
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}

const Editor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  if (!editorLoaded) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading Editor...</p>
        </div>
      </div>
    );
  }

  const editorConfig = {
    // Add our custom upload adapter
    extraPlugins: [CustomUploadAdapterPlugin],

    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "outdent",
      "indent",
      "|",
      "link",
      "imageUpload",
      "insertTable",
      "mediaEmbed",
      "|",
      "blockQuote",
      "code",
      "|",
      "undo",
      "redo",
    ],

    // Basic heading options (Classic build limitation)
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },

    // Basic editor settings
    placeholder: "Start writing your blog post here...",
    height: "400px",
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          onReady={(editor) => {
            // Editor is ready to use!
            console.log("Editor is ready to use!", editor);

            // Add custom styling
            const editingView = editor.editing.view;
            const document = editingView.document;
            const viewRoot = document.getRoot();

            // Apply custom styles to the editor content area
            editingView.change((writer) => {
              writer.setStyle("min-height", "400px", viewRoot);
              writer.setStyle("padding", "20px", viewRoot);
              writer.setStyle(
                "font-family",
                "system-ui, -apple-system, sans-serif",
                viewRoot,
              );
              writer.setStyle("line-height", "1.6", viewRoot);
            });

            // Listen for upload progress and errors
            editor.plugins
              .get("FileRepository")
              .on("uploadTotal", (evt, data) => {
                console.log("Upload progress:", data);
              });

            editor.plugins
              .get("FileRepository")
              .on("uploadComplete", (evt, { imageElement, data }) => {
                console.log("Upload completed for:", imageElement, data);
              });
          }}
          onError={(error, { willEditorRestart }) => {
            // Handle editor errors
            console.error("Editor error:", error);
            if (willEditorRestart) {
              console.log("Editor will restart");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
