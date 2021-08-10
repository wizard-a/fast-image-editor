import Layout from './layout';
import Header from './header';
import Content from './content';
import SliderLeft from './slider-left';
import SliderRight from './slider-right';

interface LayoutType extends React.FC<any> {
  Header: typeof Header;
  Content: typeof Content;
  SliderLeft: typeof SliderLeft;
  SliderRight: typeof SliderRight;
}

const LayoutContainer = Layout as LayoutType;

LayoutContainer.Header = Header;
LayoutContainer.Content = Content;
LayoutContainer.SliderLeft = SliderLeft;
LayoutContainer.SliderRight = SliderRight;

export default LayoutContainer;
