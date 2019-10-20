const storage = sessionStorage
const prefix = 'xiyi'

export const set = (key, data) => {
  storage.setItem(`${prefix}-${key}`, JSON.stringify(data))
}

export const get = key => {
  let data = storage.getItem(`${prefix}-${key}`)
  if (!data) return null

  try {
    return JSON.parse(data)
  } catch (err) {
    return null
  }
}

export const remove = key => {
  storage.removeItem(`${prefix}-${key}`)
}
