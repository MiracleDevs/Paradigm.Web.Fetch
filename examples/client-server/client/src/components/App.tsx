import React from "react";
import "./App.css";
import { Users } from "./users/Users";
import { Loading } from "./shared/Loading";

function App() {
    return <Users loadingComponent={<Loading />} />;
}

export default App;
