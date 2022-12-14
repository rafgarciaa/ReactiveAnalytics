import { default as React, useRef, useLayoutEffect } from 'react'
import styled from 'styled-components/macro'
import { pxToRems } from '@/utils'
import { mediaQuery, screenSize } from '@/rt-theme/mediaQueries'
import { LogoTextTop, LogoTextSide } from '@/assets/logos'
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
  const logoSideRef = useRef<HTMLDivElement>(null)
  const logoTopRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    function callback() {
      if (!logoSideRef.current || !logoTopRef.current) {
        return
      }
      const isSmall = window.innerWidth <= screenSize.tabletL
      logoSideRef.current.style.display = isSmall ? 'none' : 'block'
      logoTopRef.current.style.display = isSmall ? 'block' : 'none'
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])

  return (
    <Sidebar hasPreviousSearch={previousSearch ?? false}>
      <LogoWrapper>
        <div ref={logoSideRef} data-testid="side-logo">
          <LogoTextSide size={5.5} />
        </div>
        <div ref={logoTopRef} data-testid="top-logo">
          <LogoTextTop size={9} />
        </div>
      </LogoWrapper>
      {/* {ContainerService.agent === 'desktop' && <OpenfinWindowControls />} */}
    </Sidebar>
  )
}

export default AppBar
