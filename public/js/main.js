const deleteBtns = document.querySelectorAll('.delete-food-btn');

Array.from(deleteBtns).forEach(btn =>{
  btn.addEventListener("click", deleteComment)
})

async function deleteComment(){
  const foodId = this.dataset.id
  console.log(foodId)
  try{
      const res = await fetch('nutrition/delete-food', {
          method: "delete",
          headers: {'Content-type' : 'application/json'},
          body: JSON.stringify({
              'foodId' : foodId
          })
      })
      const data = await res.json()
      console.log(data)
      location.reload()
  } catch(err){
      console.log(err)
  }
}