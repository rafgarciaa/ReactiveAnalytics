import { default as React, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { mediaQuery, screenSize } from '@/rt-theme/mediaQueries'
import { LogoTextSide, LogoTextBottom } from '@/assets/logos'
import { useSearch } from '@/hooks'

const LogoWrapper = styled.div`
  margin: ${pxToRems(32)} 0;
`

const Sidebar = styled.div<{ hasPreviousSearch: boolean }>`
  display: flex;
  align-items: ${({ hasPreviousSearch }) => (hasPreviousSearch ? 'flex-start' : 'center')};
  justify-content: center;
  background: ${({ theme }) => theme.secondary.coreSecondary2};
  width: ${pxToRems(129)};
  grid-row: 2;
  @media ${mediaQuery.tabletL} {
    width: 100%;
    ${LogoWrapper} {
      margin: 0;
    }
  }
`

const AppBar = () => {
  const { previousSearch } = useSearch()
  const [restrictedWidth, setRestrictedWidth] = useState(false)

  useEffect(() => {
    function callback() {
      setRestrictedWidth(window.innerWidth <= screenSize.tabletL)
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])

  return (
    <Sidebar hasPreviousSearch={previousSearch ?? false}>
      <LogoWrapper>
        {restrictedWidth ? (
          <LogoTextSide size={9} data-testid="top-logo" />
        ) : (
          <LogoTextBottom size={5.5} data-testid="side-logo" />
        )}
      </LogoWrapper>
      {/* {ContainerService.agent === 'desktop' && <OpenfinWindowControls />} */}
    </Sidebar>
  )
}

export default AppBar
