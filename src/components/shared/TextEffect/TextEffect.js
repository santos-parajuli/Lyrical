import { Container } from '@material-ui/core'
import React from 'react'
import './TextEffect.css'

export default function TextEffect(props) {
    return (
       <Container maxWidth="xl" className="text__container">
            <div className="up__text">
                <div className="search__text">
                    {props.text}
                </div>
                <p>&mdash; lyrical &mdash;</p>   
            </div>
       </Container>
    )
}
