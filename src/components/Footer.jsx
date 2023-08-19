import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, update } from "../store/tiersSlice";
import Droppable from "./Droppable";
import { BIN_ROW_ID, BOTTOM_ROW_ID } from "./constants";

export default function Footer(props) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const setTierState = (newValue) => dispatch(update(newValue));

    const handleClickOpen = () => {
        setImage(null);
        setOpen(true);
        html2canvas(props.viewRef.current, { scale: 3 }).then((canvas) => {
            const croppedCanvas = document.createElement("canvas");
            const croppedCanvasContext = croppedCanvas.getContext("2d");
            croppedCanvas.height = canvas.height;
            croppedCanvas.width = canvas.width;
            croppedCanvasContext.drawImage(canvas, 0, 0);
            const base64Image = croppedCanvas.toDataURL();
            setImage(base64Image);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetState = () => {
        dispatch(reset());
    };

    const restoreBin = () => {
        setTierState((prevState) => {
            const sourceClone = Array.from(prevState[BIN_ROW_ID]);
            const destinationClone = Array.from(prevState[BOTTOM_ROW_ID]);
            destinationClone.push(...sourceClone);
            return {
                ...prevState,
                [BIN_ROW_ID]: [],
                [BOTTOM_ROW_ID]: destinationClone,
            };
        });
    };

    return (
        <div
            style={{
                bottom: "15px",
                position: "fixed",
                right: "15px",
                zIndex: 100,
            }}
        >
            <Stack direction="row" spacing={2}>
                <Fab
                    aria-label="download"
                    color="secondary"
                    onClick={handleClickOpen}
                    size="medium"
                    title="Download"
                >
                    <DownloadIcon />
                </Fab>
                <Fab
                    aria-label="reset"
                    color="secondary"
                    onClick={resetState}
                    size="medium"
                    title="Reset"
                >
                    <RefreshIcon />
                </Fab>
                <Droppable id={BIN_ROW_ID} key={BIN_ROW_ID}>
                    <Fab
                        aria-label="reset"
                        color={
                            props.overId === BIN_ROW_ID ? "error" : "secondary"
                        }
                        onClick={restoreBin}
                        size="medium"
                        title="Drag to Bin"
                    >
                        <DeleteIcon />
                    </Fab>
                </Droppable>
            </Stack>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                onClose={handleClose}
                open={!!(image && open)}
            >
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <img src={image} style={{ width: "100%" }} />
                        <Stack direction="row" justifyContent="center">
                            <Button
                                download="tier_list.png"
                                href={props.image}
                                onClick={handleClose}
                                variant="text"
                            >
                                Download Image
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}
