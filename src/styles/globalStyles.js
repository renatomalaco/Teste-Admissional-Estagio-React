import { createGlobalStyle } from 'styled-components';

export const myGlobalStyles = createGlobalStyle `

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: black;
    }

    p {
        font-size:20px;
    }
`

export default myGlobalStyles