import React from 'react'
import styled from 'styled-components'

const Testing = () =>{
    return (
      <Wrapper>
        <h3>hello world</h3>
        <p>hello people</p>
        <div className="article">
          <p>this is article</p>
          <p>this is article2</p>
        </div>
        <button>click me</button>
      </Wrapper>
    );
}

const Wrapper = styled.section`
    h3{
        color:red;
    }
    .article{
        font-size:22px;
        p{
            color:blue;
        }
    }
`

export default Testing