export const generator = async (query) => {
  fetch(`http://localhost:5000/?query=${query}`)
  .then(response => response.json())
  .then(data => console.log(data))
}