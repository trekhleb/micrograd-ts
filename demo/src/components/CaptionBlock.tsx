interface CaptionBlockProps {
  text: string;
}
export const CaptionBlock = ({text}: CaptionBlockProps) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'inline-block', textAlign: 'center'}}>{text}</div>
    </div>
  )
}