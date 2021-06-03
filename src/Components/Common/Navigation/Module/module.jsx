import { Menu, DatePicker } from 'antd'

const { RangePicker } = DatePicker;

const cart = (
    <Menu style={{marginTop: '3vh'}}>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
);

const onChooseDate = (date, dateString) => {
    console.log(date, dateString);
}
const search = (
    <Menu style={{marginTop: '3vh'}}>
      <Menu.Item>
        <RangePicker onChange={ onChooseDate } />
      </Menu.Item>
      <Menu.Item style={{ overflow: "scroll", maxHeight: "60vh" }}>
        DS LP trống trong ngày ấy
      </Menu.Item>
    </Menu>
);

export { cart, search };