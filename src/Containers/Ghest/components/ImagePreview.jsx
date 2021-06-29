import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { PUBLIC_FOLDER_PATH, API_ADDRESS } from "shared/helpers/APIUtils";

export default function ImagePreview(props) {
  const { item, remove } = props;
  console.log(item.fileName);
  return (
    <li>
      <div className="dzu-previewContainer">
        <img
          className="dzu-previewImage"
          alt="atachments"
          // src={`${PUBLIC_FOLDER_PATH}img/upload/${item.fileName}`}
          src={`${API_ADDRESS}/upload/${item.fileName}`}
        />
        <DeleteIcon
          color="secondary"
          className="dzu-delete-icon"
          onClick={() => {
            remove(item.id);
          }}
        />
      </div>
    </li>
  );
}
