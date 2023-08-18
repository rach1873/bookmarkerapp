const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const fa = document.querySelector('fa fa-times');
const removeAll = document.getElementById('removeAll');
const secondModal = document.getElementById('modal-bg');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');






let bookmarks = [];

function showModal() {
    modal.classList.add('show-modal');
    removeAll.disabled = true;
   
}

function buildBookmarks() {

    bookmarks.forEach((bookmark)=>{
        const {name, url} = bookmark

        const item = document.createElement('div');
        item.classList.add('item')

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('id', 'delete-item');
        // closeIcon.setAttribute('title', 'Delete Bookmark');
        // closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        const linkInfo = document.createElement('div');

        linkInfo.classList.add('name');

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `favicon.png`);
        favicon.setAttribute('alt', 'Favicon');

        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
        
    })
}

//retrieves bookmarks from localStorage
function getBookmarks() {
    if(localStorage.getItem('bookmark')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmark'))
        
    } else {
        bookmarks = [];
    }

    buildBookmarks();
}



function storeBookmark(e) {


    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;

    if(!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`
    }

    const bookmark = {
        name: nameValue,
        url: urlValue
    };

    
    bookmarks.push(bookmark);


    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
   
    removeNodes();
    getBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
    

    
} 


function removeNodes() {
    const items = document.querySelectorAll('.item');

    items.forEach(x => x.remove())
    
}



modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
    removeAll.disabled = false;
})

window.addEventListener('click',(e) => (e.target === modal ? (modal.classList.remove('show-modal'), removeAll.disabled = false) : false));


bookmarkForm.addEventListener('submit', storeBookmark)



window.addEventListener('click', (e)=> {

    const mark = e.target.parentElement.textContent.toLowerCase() 
    const id = e.target.id;


    if(id === 'delete-item') {


    bookmarks.splice(bookmarks.findIndex(obj => obj.name === mark),1)

    localStorage.setItem('bookmark', JSON.stringify(bookmarks))

    e.target.parentElement.remove(); 

        }  


 })

bookmarksContainer.addEventListener('DOMSubtreeModified', (e) => {

    const marks = bookmarksContainer.childNodes.length;

    if(marks) {

        removeAll.classList.remove('hideBtn');

    } else {


        removeAll.classList.add('hideBtn');
    }

   

})


removeAll.addEventListener('click', () => {

    secondModal.classList.add('unveil');
    

    btn1.addEventListener('click', () => {

        
        bookmarks.splice(0,bookmarks.length); //empties array
        removeNodes(); //remove bookmarks from page
        localStorage.removeItem('bookmark'); //remove bookmarks for localStorage

        removeAll.classList.add('hideBtn'); //hides "remove all bookmarks" button
        secondModal.classList.remove('unveil'); //hide 2nd modal


    })

    btn2.addEventListener('click', () => {

        
        secondModal.classList.remove('unveil');
    })

    
})





getBookmarks(); 

