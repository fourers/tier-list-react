import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../store/tiersSlice";

export default function Footer(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        props.takeScreenshot();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetState = () => {
        dispatch(reset());
    };

    return (
        <div
            style={{
                bottom: "15px",
                position: "absolute",
                right: "15px",
                zIndex: 100,
            }}
        >
            <Stack direction="row" spacing={2}>
                <Fab
                    color="primary"
                    aria-label="download"
                    size="medium"
                    onClick={handleClickOpen}
                >
                    <DownloadIcon />
                </Fab>
                <Fab
                    color="primary"
                    aria-label="reset"
                    size="medium"
                    onClick={resetState}
                >
                    <DeleteIcon />
                </Fab>
            </Stack>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth={true}
            >
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" justifyContent="center">
                            <Button
                                variant="text"
                                onClick={handleClose}
                                href={props.image}
                                download="tier_list.png"
                            >
                                Download Image
                            </Button>
                        </Stack>
                        <img src={props.image} style={{ width: "100%" }} />
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}
