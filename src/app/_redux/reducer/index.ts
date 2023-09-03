import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarReducer";

const reducers = combineReducers({ sidebar: sidebarReducer });

export default reducers;
