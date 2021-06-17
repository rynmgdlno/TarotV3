export const generator = async (query) => {
  fetch(`http://api.tarotcolor.com/?query=${query}`)
  .then(response => response.json())
  .then(data => console.log(data))
}