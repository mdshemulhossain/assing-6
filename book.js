document.getElementById('liveAlert').style.display='none';
// loading aria 
const toggleSpinner = displayStyle =>{
  document.getElementById('loading').style.display = displayStyle;
}
// api
const searchBook = () =>{
    const searchText = document.getElementById('search-field').value;
    const resultDiv =document.getElementById('result-div');
    if(searchText === ''){
      console.log('fuck')
      const noSearchDiv = document.createElement('div');
      noSearchDiv.innerHTML=`
      <div class="card-header">Total result on this topic:</div>
      <div class="card-body bg-warning">
        <h5 class="card-title">No result!Please search by book name.</h5>
      </div>
      `
      resultDiv.appendChild(noSearchDiv);
    }
    else{
    toggleSpinner('block');
    console.log(searchText);
    loadBook(searchText);
    document.getElementById('search-field').value='';
  }
}
// api fetch
const loadBook = searchText=>{
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data.docs))
    .catch(error => console.log(error))
}
//Error function
const displayError = error =>{
  document.getElementById('liveAlert').style.display='block';
}
// api information
const displayBook = books =>{
    console.log(books);
    const totalResult = books.length;
    const resultDiv =document.getElementById('result-div');
    resultDiv.textContent='';
    const divNew = document.createElement('div');
    divNew.innerHTML=`
    <div class="card-header">Total Result Book:
    <h5 class="card-title">${totalResult}</h5>
    </div>
    `
    resultDiv.appendChild(divNew)
    const container = document.getElementById('books');
    container.textContent = '';
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.innerHTML=`
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-lg-auto border border-success d-flex justify-content-center " alt="...">
        <div class="text-center text-success">
          <h3 class="card-title">${book.title}</h3>
          <p class="card-text">${book.first_sentence}</p>
           <p>Author:${book.author_name}</p>
           <p>Publisher: ${book.publisher}</p>
           <p>First published: ${book.first_publish_year}</p>

        </div>
        <div class="mb-5">
          <a href="https://openlibrary.org/authors/${book.edition_key}.json" target="_blank" class="text-center text-success card-link ">Link here</a>
        </div>
        `
        container.appendChild(div);
    });
    //  
    toggleSpinner('none')
}
// loadBook();

