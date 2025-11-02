document.addEventListener("DOMContentLoaded", () => {
    const storedURLss = JSON.parse(localStorage.getItem('URLs'));

    if (storedURLss){
        storedURLss.forEach((URLs) => urlss.push(URLs));
        updateURLssList();
        updateStats();
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
        updateStats();
        saveURLs();
    }
};
const copyURLs = (index) => {


};
const deleteURLs = (index) => {
    urlss.splice(index, 1);
    updateURLssList();
    updateStats();
    saveURLs();
};

const updateStats = () => {
    const completedURLss = urlss.filter(urls => urls.completed).length;
    const totalURLss = urlss.length;
    const progress = (completedURLss / totalURLss)*100;
    const progressBar = document.getElementById('progress')

    progressBar.style.width= `${progress}% `

    document.getElementById("numbers").innerText = `${completedURLss} / ${totalURLss}`;

    if(urlss.length && completedURLss === totalURLss) {
        blastConfetti();
    };
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

const blastConfetti = () => {
    const count = 200,
    defaults = {
    origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    };

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
};

document.getElementById('newURLs').addEventListener('click', function(e){
    e.preventDefault();

    addURLs();
});