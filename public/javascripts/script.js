const celebSearchInput = document.querySelector('#celebSearch');

celebSearchInput.oninput = async (event) => {
    const requestURL = `https://movies-and-celebs.herokuapp.com/api/celebrities?name=${event.target.value}`;

    const response = await axios.get(requestURL);

    const div = document.getElementById('celeb');
    div.innerHTML = '';

    response.data.celebrities.forEach(oneCeleb => {
        div.innerHTML += `
            <div class="oneCeleb">
            <a href="/celebrities/${oneCeleb._id}"><h3>${oneCeleb.name}</h3></a>

            <a href="/celebrities/${oneCeleb._id}/edit">Edit Celebrity</a>

            <form action="/celebrities/${oneCeleb._id}/delete" method="post">
                <button type="submit">Delete Celebrity</button>
            </form>
            </div>
            `;
    });
};
