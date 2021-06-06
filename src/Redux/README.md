# Làm việc với Redux thông qua hooks

- useSelector(state => ...) 
  - useSelector: dùng để lấy data từ redux
  - khi state cũ khác state mới -> useSelector sẽ strigger lại, cập nhật lại. 
  - state: root reducer, allReducers
- useDispatch() 

1. Setup redux store

- Reducers & Root reducer
- Action creators
- Store

2. Setup redux provider 

- Nên để tại file mạnh nhất: index.js của ReactJS

3. Connect to redux store from component

- sử dụng 2 hooks