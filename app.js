document.addEventListener("DOMContentLoaded", () => {
    const storedURLss = JSON.parse(localStorage.getItem('URLs'));

    if (storedURLss){
        storedURLss.forEach((URLs) => urlss.push(URLs));
        updateURLssList();
    };
});


let urlss = [];

const saveURLs = () => {
    localStorage.setItem("URLs", JSON.stringify(urlss))
}

const addURLs = () => {
    const urlsInput = document.getElementById('urlsInput');
    const text = urlsInput.value.trim();

    if(text){
        urlss.push({text: text, completed: false});
        urlsInput.value= "";
        
        updateURLssList();
        saveURLs();
    }
};
const copyURLs = (index) => {
    const urlToCopy = urlss[index].text;
    navigator.clipboard.writeText(urlToCopy)
        .then(() => {
            alert(`Copied: ${urlToCopy}`);
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
};
const deleteURLs = (index) => {
    urlss.splice(index, 1);
    updateURLssList();
    saveURLs();
};


const updateURLssList = () => {
    const urlsList = document.getElementById('urls-list')
    urlsList.innerHTML = ''

    urlss.forEach((urls, index) => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `
        <div class="urlsItem">
            <div class="urls ${urls.completed ? "completed": ""}">
                <p>${urls.text}</p>
            </div>
            <div class="icons">
                <img src="./img/copy.png" onClick="copyURLs(${index})" />
                <img src="./img/bin.png" onClick="deleteURLs(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleURLsComplete(index));
        urlsList.append(listItem);
    });
};  
document.getElementById('newURLs').addEventListener('click', function(e){
    e.preventDefault();

    addURLs();
});