import { createContext, useState } from "react";

export const DialogContext = createContext(false);

export function DialogContextProvider({ children }) {
	const [data, setData] = useState(false);

	return (
		<DialogContext.Provider value={{ data, setData }}>
			{children}
		</DialogContext.Provider>
	);
}