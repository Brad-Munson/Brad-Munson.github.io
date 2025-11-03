let titleField = document.querySelector('#title-search');
let searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click',searchBooks);

const endpoint = "https://openlibrary.org/search.json?";

async function searchBooks() {
    let title = titleField.value.trim();
    if (!title) { 
        alert("Please enter a book title before searching.");
        return;
    }

    let search_title = encodeURIComponent(title);
    

    console.log(search_title);

    //let curr_end = String(endpoint + "title=" + title);
    let curr_end = `${endpoint}title=${search_title}`;
    console.log(curr_end);

    try {
        const response = await fetch(curr_end);
        if(!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);

        displayBooks(json);

    } catch(err) {
        console.log(err);
        alert('Failed to get book');
    }
}

function displayBooks(json) {
    for (i= 0; i < 5; i++) {
        let title_id = String("book" + (i + 1));
        let cover_id = String("img" + (i + 1));

        //let workKey = json.docs[i].key; 
        //let olid = workKey.split("/").pop();

        //let olid = String(json['docs'][i]['key']);
        //let cover_src = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

        let doc = json.docs[i];
        let cover_src = "";

        if (doc.cover_i) {
            cover_src = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
        } else if (doc.cover_edition_key && doc.cover_edition_key.length > 0) {
            cover_src = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key[0]}-M.jpg`;
        } else {
            cover_src = "https://via.placeholder.com/128x195?text=No+Cover";
        }

        console.log(cover_src);

        document.getElementById(title_id).textContent = json['docs'][i]['title'];
        document.getElementById(cover_id).src = cover_src;
        document.getElementById(cover_id).alt = doc.title || "Book cover";

        
    }
}