import { Menu, DatePicker } from 'antd'

const { RangePicker } = DatePicker;

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


export { search };