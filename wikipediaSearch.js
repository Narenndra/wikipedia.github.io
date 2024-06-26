let userSearchReqEle = document.getElementById("searchInput");
let searchResultContainer = document.getElementById("searchResults");
let loadingEle = document.getElementById("spinner");


function createAndAppendSearchResult(result) {
    loadingEle.classList.add("d-none");
    searchResultContainer.classList.remove("d-none");
    let {
        description,
        link,
        title
    } = result;
    let ResultItemEle = document.createElement("div");
    searchResultContainer.appendChild(ResultItemEle);

    let titleEle = document.createElement("a");
    titleEle.textContent = title;
    titleEle.href = link;
    titleEle.target = "_blank";
    titleEle.classList.add("result-title");
    ResultItemEle.appendChild(titleEle);

    let titleBrEle = document.createElement("br");
    ResultItemEle.appendChild(titleBrEle);

    let linkResultEle = document.createElement("a");
    linkResultEle.textContent = link;
    linkResultEle.href = link;
    linkResultEle.terget = "_blank";
    linkResultEle.classList.add("result-url");
    ResultItemEle.appendChild(linkResultEle);

    let linkBrEle = document.createElement("br");
    ResultItemEle.appendChild(linkBrEle);

    let desResultEle = document.createElement("p");
    desResultEle.textContent = description;
    desResultEle.classList.add("link-description");
    ResultItemEle.appendChild(desResultEle);

}



function displayResult(searchResult) {
    for (let result of searchResult) {
        createAndAppendSearchResult(result);
    }

}




function getResult(event) {
    if (event.key === "Enter") {
        loadingEle.classList.remove("d-none");
        searchResultContainer.classList.add("d-none");
        searchResultContainer.textContent="";
        let userInputVal = userSearchReqEle.value;
        let urlText = "https://apis.ccbp.in/wiki-search?search=" + userInputVal;

        let options = {
            method: "GET",
        }

        fetch(urlText, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonText) {
                let {
                    search_results
                } = jsonText;
                displayResult(search_results);
            })
    }
}



userSearchReqEle.addEventListener("keydown", getResult);