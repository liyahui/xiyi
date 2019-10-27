export function registerElementUI(components = []) {
  const result = {}
  components.forEach(component => {
    result[component.name] = component
  })
  return result
}