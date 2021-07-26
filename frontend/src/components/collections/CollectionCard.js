import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import IconButton from "@material-ui/core/IconButton";
import UpdateCollection from "./UpdateCollection";
import DeleteCollection from "./DeleteCollection";
import { UserContext, RoomContext, CollectionContext } from "./../UserContext";
import { buttonStyles, cardStyles } from "../Styles";

function CollectionCard({ collection }) {
  // Initial States
  const history = useHistory();
  const context = useContext(CollectionContext);
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);
  const cardStyle = cardStyles();
  const buttonStyle = buttonStyles();

  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();
  const [shadow, setShadow] = useState(false);

  const editCollection = (collectionId, collectionName) => {
    setCancelButton(true);
    setEdit(true);
  };

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  };

  const openDelete = (id, name) => {
    setOpen(true);
    setShowDialog(
      <DeleteCollection
        collectionData={{ id, name }}
        closeDelete={() => closeDelete()}
      />
    );
  };

  // Used to hide the Create New Collection Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  const enterCollection = (collectionId, collectionName) => {
    context.setCollection(collection);
    history.push("/items");
  };

  if (user.id != room.uid) {
    return (
      <div>
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <CardContent className={cardStyle.content}>
              <div>
                <p>{collection.name} Collection</p>
                <p>
                  {collection.private
                    ? "Private - No one can view this collection"
                    : "Public - Anyone can view this collection"}
                </p>
                <p>{collection.items.length} Items Stored</p>
              </div>
            </CardContent>
            <div className={cardStyle.controls}>
              {/* Enter/Update/Delete collection Buttons */}
              <IconButton
                size="medium"
                color="primary"
                onClick={() => {
                  enterCollection(collection.id, collection.name);
                }}
              >
                <MeetingRoomIcon />
              </IconButton>
              <span>{message}</span>
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
        </Card>
        <br />
      </div>
    );
  } else if (edit) {
    return (
      <div key={collection.id}>
        {/* Displays the content as editable */}
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <div className={cardStyle.controlsOpen}>
              <UpdateCollection
                collectionData={{
                  collectionId: collection.id,
                  collectionName: collection.name,
                }}
                handleClose={cancelClicked}
              />
              {cancelButton ? (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  type="submit"
                  id="cancelButton"
                  value="Cancel"
                  onClick={() => {
                    cancelClicked();
                  }}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <CardContent className={cardStyle.content}>
              <div>
                <p>{collection.name} Collection</p>
                <p>
                  {collection.private
                    ? "Private - No one can view this collection"
                    : "Public - Anyone can view this collection"}
                </p>
                <p>{collection.items.length} Items Stored</p>
              </div>
            </CardContent>
            <div className={cardStyle.controls}>
              {/* Enter/Update/Delete collection Buttons */}
              <IconButton
                size="medium"
                color="primary"
                onClick={() => {
                  enterCollection(collection.id, collection.name);
                }}
              >
                <MeetingRoomIcon />
              </IconButton>
              <IconButton
                size="medium"
                color="primary"
                onClick={() => {
                  editCollection(collection.id, collection.name);
                }}
              >
                <EditIcon />
              </IconButton>
              {/* <IconButton size="small" color="secondary" onClick={doDelete(collection.id,collection.name)}><DeleteIcon/></IconButton> */}
              <span>{message}</span>
              {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  openDelete(collection.id, collection.name);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
        </Card>
        <br />
      </div>
    );
  }
}

export default CollectionCard;
