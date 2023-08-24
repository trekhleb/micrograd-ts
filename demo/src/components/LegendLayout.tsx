import { Block } from "baseui/block";
import { H2 } from "./h2";
import { MonoLabelLarge } from "baseui/typography";

interface LegendItem {
  standardColor: string;
  hoverColor: string;
  hovered: boolean;
  text: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface LegendLayoutProps {
  legend: LegendItem[],
}

export const LegendLayout = ({legend}: LegendLayoutProps) => {
  return (
    <Block marginBottom="20px">
      <H2>Legend</H2>
      <MonoLabelLarge>
        <Block display="flex" width='auto' flexDirection={'column'}>
          {legend.map((li) => (
            <Block display="flex">
              <div 
                style={{
                  backgroundColor: li.hovered ? li.hoverColor : li.standardColor,
                  width: '20px', 
                  height: '20px', 
                  marginRight: '10px',
                  transition: 'background-color 0.2s ease-in'
                }} 
                onMouseEnter={li.onMouseEnter}
                onMouseLeave={li.onMouseLeave}
              />
              <div>{li.text}</div>
            </Block>
          ))}
        </Block>
      </MonoLabelLarge>
    </Block>
  );
}