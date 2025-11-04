let urlss = [];

document.addEventListener("DOMContentLoaded", async () => {
    const storedURLss = JSON.parse(localStorage.getItem('URLs')) || [];

    // Carrega também do servidor
    try {
        const res = await fetch("http://127.0.0.1:5000/get_urls");
        const serverURLs = await res.json();

        // Junta locais e servidor, evitando duplicatas
        const combined = [...serverURLs];
        storedURLss.forEach(u => {
            if (!combined.find(c => c.short === u.short)) {
                combined.push(u);
            }
        });

        urlss = combined;
        updateURLssList();
    } catch (err) {
        console.error("Error: Couldn't fetch URL to server:", err);
        urlss = storedURLss;
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: originalURL })
        });

        const data = await res.json();

        if (data.short_url) {
            urlss.push({ original: originalURL, short: data.short_url, copies: 0 });
            urlsInput.value = "";
            updateURLssList();
            saveURLs();
        } else {
            alert("Error: Couldn't shorten");
        }
    } catch (err) {
        console.error("Couldn't shorten:", err);
    }
};

const copyURLs = (index) => {
    const urlToCopy = urlss[index].short;
    navigator.clipboard.writeText(urlToCopy)
        .then(() => {
            urlss[index].copies = (urlss[index].copies || 0) + 1;
            saveURLs();
            updateURLssList();
            alert(`Copied: ${urlToCopy}`);
        })
        .catch(err => console.error("Couldn't copy", err));
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
                <p><a"${urls.short }" target="_blank">Shortened: ${urls.short}</a></p>
                ${IS_ADMIN ? `<small>Original: ${urls.original || ''}</small>` : ''}
                ${IS_ADMIN ? `<small>Copied: ${urls.copies || 0} ${urls.copies === 1 ? 'time' : 'times'}</small>` : ''}
            </div>
            <div class="icons">
                <img src="./static/img/copy.png" onClick="copyURLs(${index})" title="Copy URL" />
                <img src="./static/img/bin.png" onClick="deleteURLs(${index})" title="Delete URL" />
            </div>
        </div>
        `;
        urlsList.append(listItem);
    });
};

document.getElementById('newURLs').addEventListener('click', function (e) {
    e.preventDefault();
    addURLs();
});