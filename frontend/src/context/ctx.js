import { createContext, useState } from "react";

const ctxValues = {
	dialog: false
}

export const DefaultContext = createContext(null);

export function DefaultContextProvider({ children }) {
	const [ctxData, setCtxData] = useState(ctxValues);

	return (
		<DefaultContext.Provider value={{ ctxData, setCtxData }}>
			{children}
		</DefaultContext.Provider>
	);
}