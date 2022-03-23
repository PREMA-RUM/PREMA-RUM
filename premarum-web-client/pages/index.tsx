import type { NextPage } from 'next'
import Home from './home'
import {useRouter} from "next/router";
import {useEffect} from "react";
import Landing from './landing';

const Index: NextPage = () => {
  const router = useRouter();
  
  return (
    <Landing />
  )
}

export default Landing
