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
                position: "fixed",
                right: "15px",
                zIndex: 100,
            }}
        >
            <Stack direction="row" spacing={2}>
                <Fab
                    aria-label="download"
                    color="primary"
                    onClick={handleClickOpen}
                    size="medium"
                >
                    <DownloadIcon />
                </Fab>
                <Fab
                    aria-label="reset"
                    color="primary"
                    onClick={resetState}
                    size="medium"
                >
                    <DeleteIcon />
                </Fab>
            </Stack>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                onClose={handleClose}
                open={open}
            >
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <img src={props.image} style={{ width: "100%" }} />
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
