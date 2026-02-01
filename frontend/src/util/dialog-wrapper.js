import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { DefaultContext } from "../context/ctx";
import { useContext } from "react";

export default function DialogWrapper() {
	const { ctxData, setCtxData } = useContext(DefaultContext);

	const onClose = () => {
		setCtxData((prev) => ({ ...prev, dialog: false }));
	}

	return (
		<Dialog
			open={true}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{ctxData.dialog?.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{ctxData.dialog?.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={ctxData.dialog?.buttons?.confirm}>
					{ctxData.dialog?.buttons?.confirm_label || "Confirmar"}
				</Button>
				<Button autoFocus onClick={onClose}>
					{ctxData.dialog?.buttons?.cancel_label || "Cancelar"}
				</Button>
			</DialogActions>
		</Dialog>
	)
}