import { useEffect, useState } from "react";
import axios from 'axios'
import { serverUrl } from "../constants";

export default function useFetch<T>(path: string) {
    const state = useState<T[]>([]);

    useEffect(() => {
        axios.get(serverUrl + path).then(res => {
            state[1](res.data);
        })
    }, [])
    return state;

}