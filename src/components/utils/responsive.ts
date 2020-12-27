import styled from 'styled-components'

export const OnlyPC = styled.div`
  @media screen and (min-width: 0) and (max-width: 719px) {
    display: none;
  }
`

export const OnlyMobile = styled.div`
  @media screen and (min-width: 720px) {
    display: none;
  }
`