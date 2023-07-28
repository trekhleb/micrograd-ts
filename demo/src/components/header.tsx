import { Block } from 'baseui/block'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation'
import { StyledLink } from 'baseui/link'
import { AiFillGithub } from 'react-icons/ai'
import { Notification } from 'baseui/notification'

export function Header() {
  return (
    <>
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

      <Notification
        overrides={{
          Body: { style: { width: 'auto' } },
        }}
      >
        A tiny scalar-valued autograd engine and a neural net on top of it{' '}
        (TypeScript version of{' '}
        <StyledLink href="https://github.com/karpathy/micrograd">
          karpathy/micrograd
        </StyledLink>{' '}
        repo)
      </Notification>
    </>
  )
}
