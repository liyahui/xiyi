export const orderStatusList = [
  {
    value: 1,
    label: '待确认'
  },
  {
    value: 5,
    label: '待交付'
  },
  {
    value: 2,
    label: '待取衣'
  },
  {
    value: 4,
    label: '洗涤中'
  },
  {
    value: 6,
    label: '已完成'
  }
]

export const orderConfirmActionMap = {
  1: 'FETCH_FROM_USER',
  5: 'SEND_TO_USER'
}
