import { Block } from 'baseui/block'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation'
import { StyledLink } from 'baseui/link'
import { AiFillGithub } from 'react-icons/ai'

export function Header() {
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem $style={{ fontWeight: 600 }}>
          Micrograd TS
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem
          $style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginRight: '24px',
          }}
        >
          <Block marginRight="5px" display="flex">
            <AiFillGithub size={24} />
          </Block>
          <StyledLink href="https://github.com/trekhleb/micrograd-ts">
            GitHub
          </StyledLink>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  )
}
