import { createGlobalStyle } from 'styled-components';
import "/src/styles/variables.scss";

export const myGlobalStyles = createGlobalStyle `

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .test-credentials {
        all: unset;
        margin-top: 46px;
        font-size: 20px;
        color: #424242;
    }

    body {
        background-color: #ffffff;
    }
`

export default myGlobalStyles