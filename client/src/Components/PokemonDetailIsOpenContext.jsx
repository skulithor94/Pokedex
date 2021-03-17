import React from "react";

// set the defaults
const PokemonDetailIsOpenContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {}
});

export default PokemonDetailIsOpenContext;