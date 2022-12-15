import { default as React, useRef, useLayoutEffect } from 'react'
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
  const logoTextBottomRef = useRef<HTMLDivElement>(null)
  const logoTextSideRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    function callback() {
      if (!logoTextBottomRef.current || !logoTextSideRef.current) {
        return
      }
      const isSmall = window.innerWidth <= screenSize.tabletL
      logoTextBottomRef.current.style.display = isSmall ? 'none' : 'block'
      logoTextSideRef.current.style.display = isSmall ? 'block' : 'none'
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])

  return (
    <Sidebar hasPreviousSearch={previousSearch ?? false}>
      <LogoWrapper>
        <div ref={logoTextBottomRef} data-testid="side-logo">
          <LogoTextBottom size={5.5} />
        </div>
        <div ref={logoTextSideRef} data-testid="top-logo">
          <LogoTextSide size={9} />
        </div>
      </LogoWrapper>
      {/* {ContainerService.agent === 'desktop' && <OpenfinWindowControls />} */}
    </Sidebar>
  )
}

export default AppBar
