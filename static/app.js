let urlss = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedURLss = JSON.parse(localStorage.getItem('URLs'));
    if (storedURLss) {
        storedURLss.forEach((URLs) => urlss.push(URLs));
        updateURLssList();
    }
});

const saveURLs = () => {
    localStorage.setItem("URLs", JSON.stringify(urlss));
};

const addURLs = async () => {
    const urlsInput = document.getElementById('urlsInput');
    const originalURL = urlsInput.value.trim();
    if (!originalURL) return;

    try {
        const res = await fetch("http://127.0.0.1:5000/shorten", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: originalURL})
        });

        const data = await res.json();

        if (data.short_url) {
            urlss.push({ text: originalURL, short: data.short_url });
            urlsInput.value = "";
            updateURLssList();
            saveURLs();
        } else {
            alert("Errot couldn't shorten URL");
        }
    } catch (err) {
        console.error("Err:", err);
    }
};

const copyURLs = (index) => {
    const urlToCopy = urlss[index].short;
    navigator.clipboard.writeText(urlToCopy)
        .then(() => alert(`copied: ${urlToCopy}`))
        .catch(err => console.error("couldn't copy", err));
};

const deleteURLs = (index) => {
    urlss.splice(index, 1);
    updateURLssList();
    saveURLs();
};

const updateURLssList = () => {
    const urlsList = document.getElementById('urls-list');
    urlsList.innerHTML = '';

    urlss.forEach((urls, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="urlsItem">
            <div class="urls">
                <p><a>${urls.short}</a></p>
            </div>
            <div class="icons">
                <img src="./static/img/copy.png" onClick="copyURLs(${index})" />
                <img src="./static/img/bin.png" onClick="deleteURLs(${index})" />
            </div>
        </div>
        `;
        urlsList.append(listItem);
    });
};

document.getElementById('newURLs').addEventListener('click', function(e){
    e.preventDefault();
    addURLs();
});
