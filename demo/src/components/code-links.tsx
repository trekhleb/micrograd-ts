import { ListItem, ListItemLabel } from 'baseui/list'
import { BiLogoTypescript } from 'react-icons/bi'
import { StyledLink } from 'baseui/link'

type CodeLinksProps = {
  links: { name: string; url: string }[]
}

export function CodeLinks(props: CodeLinksProps) {
  const list = props.links.map((link) => {
    return (
      <ListItem key={link.url} artwork={() => <BiLogoTypescript size="24" />}>
        <ListItemLabel>
          <StyledLink href={link.url}>{link.name}</StyledLink>
        </ListItemLabel>
      </ListItem>
    )
  })
  return <>{list}</>
}
