import React from 'react';
import styled from "styled-components";

function InlineError({ error }) {
    return (
        <ErrorWrapper>
             <p className="error">{error}</p>
        </ErrorWrapper>
       
    )
}
export default InlineError
const ErrorWrapper = styled.div`
.error {
    color: red;
    font-size: 0.8rem;
    margin-top: -15px;
    margin-bottom: 15px;
}
`