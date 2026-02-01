import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { DialogContext } from "./dialog-ctx";
import { useContext } from "react";

export default function DialogWrapper() {
	const { data, setData } = useContext(DialogContext);

	const onClose = () => {
		setData(false);
	}

	return (
		<Dialog
			open={true}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{data?.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{data?.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={data?.buttons?.confirm}>
					{data?.buttons?.confirm_label || "Confirmar"}
				</Button>
				<Button autoFocus onClick={onClose}>
					{data?.buttons?.cancel_label || "Cancelar"}
				</Button>
			</DialogActions>

		</Dialog>
	)
}