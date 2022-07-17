import { useRef, useState } from "react";

import { doc, setDoc, getFirestore, storage } from "../firbaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Upload() {
  /*************** STATE *******************/
  // filename to use as an alternative to the upload file input
  const [fileName, setFileName] = useState("");
  // percent to show uploading progress
  const [percent, setPercent] = useState(null);

  // ref to the upload input
  const uploadRef = useRef(null);

  /*************** METHODS *******************/
  function handleClick() {
    // fire click event on upload file input
    uploadRef.current.click();
  }

  // Upload function
  function handleUpload(e) {
    // get file data
    let file = e.target.files[0];

    // if no file added
    if (!file) {
      alert("Please choose a file first!");
    }
    // set alternative name
    setFileName(file.name);

    // update configuration
    // storage ref at firebase
    const storageRef = ref(storage, `/files/${file.name}`);
    // update method
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      // during upload in progress
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      // upload error
      (err) => console.log(err),
      // upload success
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (url) => {
            // get database( getFirestore), collection name (videos-collection) on firestore and document name
            let docRef = doc(getFirestore(), "videos-collection", file.name);

            // set document content
            await setDoc(docRef, {
              videoUrl: url,
              name: file.name,
            });
          })
          .then(() => {
            // reset file name & percent
            setFileName("");
            setPercent(null);
          });
      }
    );
  }

  return (
    <section>
      {/* upload file input  */}
      <input
        type="file"
        ref={uploadRef}
        onChange={handleUpload}
        accept=""
        style={{ display: "none" }}
      />
      {/* upload file button  */}
      <button onClick={handleClick} className="upload-btn">
        Select
      </button>
      <p className="file-name">{fileName}</p>
      <p className="upload-percent">{percent && `${percent} % done`}</p>
    </section>
  );
}

export default Upload;
