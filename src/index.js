// Import React dependencies
import React from "react";
import ReactDOM from "react-dom";

// Import root SCSS file
import "./index.scss";

// Import root basepage
import Basepage from "./pages/basepage/Basepage";

// Import 3rd party libraries
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

ReactDOM.render(<Basepage />, document.getElementById("root"));
