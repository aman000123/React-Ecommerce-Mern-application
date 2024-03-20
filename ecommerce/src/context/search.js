

import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const [auth, setAuth] = useState({

        keyword: "",
        results: []
    })
    return <SearchContext.Provider value={[auth, setAuth]}>
        {/* //now we can use auth and set auth anywhere */}
        {children}
    </SearchContext.Provider>

}

//create custom hooks
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }