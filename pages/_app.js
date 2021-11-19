import React,{useEffect,useState} from "react"
import {Layout} from "../components"
import 'tailwindcss/tailwind.css'
import "../styles/globals.scss"
import "../styles/lineClamp.scss"
import isReachable from 'is-reachable'

function MyApp({ Component, pageProps }) {

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>

    )




}

export default MyApp
