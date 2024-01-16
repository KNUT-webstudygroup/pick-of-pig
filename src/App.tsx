import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Door from "@/components/Door";
import HalfDoor from "@/components/HalfDoor";
import Map from "@/Map";
import Layout from "@/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="/door" element={<Door />}></Route>
        <Route path="/halfdoor" element={<HalfDoor />}></Route> */}
      </Route>
    </Routes>
  );
}

export default App;

const Main = styled.div`
  position: absoulte;
  background-color: #333;
  display: flex;
`;
